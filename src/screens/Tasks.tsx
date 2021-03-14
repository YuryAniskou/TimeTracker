import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import moment from "moment";
import { Formik } from "formik";

import { ModalView } from "../components/ModalView";
import { ListItem } from "../components/ListItem";
import { AppContext } from "../contexts";
import TaskDbService from "../services/db/TaskDbService";
import { Task } from "../models";
import { RootStackParamList } from "../App";

type TasksScreenRouteProp = RouteProp<RootStackParamList, "Tasks">;

function Tasks(): React.ReactElement {
  const dbInstance = useContext(AppContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const navigation = useNavigation();
  const route = useRoute<TasksScreenRouteProp>();

  const taskService = useMemo(() => {
    if (dbInstance) return new TaskDbService(dbInstance);
  }, [dbInstance]);

  const handleCloseModal = useCallback(() => setIsOpenModal(false), []);
  const handleOpenModal = useCallback(() => setIsOpenModal(true), []);

  const handleSubmitForm = useCallback(
    (params: Task) => {
      taskService
        ?.createItem({
          ...params,
          projectId: route.params?.projectId,
          createdAt: moment().toISOString(),
        })
        .then((task) => {
          setTasks([...tasks, task]);
          handleCloseModal();
        });
    },
    [taskService, handleCloseModal, tasks]
  );

  const handleTaskClick = useCallback(
    (id: number) => () => {
      console.log("sssss", id);
      navigation.navigate("Task", {
        id,
      });
    },
    []
  );

  const handleTaskRemoveClick = useCallback(
    (id: number) => () => {
      taskService?.deleteItem(id).then(() => {
        const filteredItems = tasks.filter((task) => task.id !== id);

        setTasks(filteredItems);
      });
    },
    [tasks, taskService]
  );

  useEffect(() => {
    taskService?.getList({}).then(setTasks);
  }, [taskService]);

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        {tasks.map((task, index) => (
          <ListItem
            key={task.id}
            label={`${index + 1}. ${task.title}`}
            onPress={handleTaskClick(task.id)}
            onRemove={handleTaskRemoveClick(task.id)}
          />
        ))}
      </ScrollView>

      <ModalView
        isOpen={isOpenModal}
        title="Add task"
        onClose={handleCloseModal}
      >
        <Formik
          initialValues={{ title: "" } as Task}
          onSubmit={handleSubmitForm}
        >
          {({ handleChange, handleSubmit, values }) => (
            <>
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  padding: 0,
                  marginBottom: 10,
                  borderColor: "#ccc",
                }}
                onChangeText={handleChange("title")}
                value={values.title}
                placeholder="Task Name"
              />
              <Button onPress={handleSubmit} title="Submit" />
            </>
          )}
        </Formik>
      </ModalView>

      <TouchableOpacity
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          backgroundColor: "#ccc",
          borderRadius: 50,
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 3,
          zIndex: 10,
        }}
        onPress={handleOpenModal}
      >
        <Text>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Tasks;
