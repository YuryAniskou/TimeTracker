import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Button,
} from "react-native";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { ModalView } from "../components/ModalView";

interface Values {
  name: string;
  hourRate: string;
}

function Project(): React.ReactElement {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [tasks, setTasks] = useState<Values[]>([]);

  const navigation = useNavigation();

  const handleCloseModal = useCallback(() => setIsOpenModal(false), []);
  const handleOpenModal = useCallback(() => setIsOpenModal(true), []);

  const handleSubmitForm = useCallback(
    (values: Values) => {
      setTasks([...tasks, values]);
      handleCloseModal();
    },
    [handleCloseModal, tasks]
  );

  const handleProjectClik = useCallback(
    (id: number) => () => {
      navigation.navigate("Project", {
        id,
      });
    },
    []
  );

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        {projects.map((project, index) => (
          <TouchableOpacity key={index} onPress={handleProjectClik(index)}>
            <View>
              <Text>
                {index + 1}. {project.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ModalView
        isOpen={isOpenModal}
        title="Add project"
        onClose={handleCloseModal}
      >
        <Formik
          initialValues={{ name: "", hourRate: "" }}
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
                onChangeText={handleChange("name")}
                value={values.name}
                placeholder="Project Name"
              />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  padding: 0,
                  marginBottom: 10,
                  borderColor: "#ccc",
                }}
                onChangeText={handleChange("hourRate")}
                keyboardType="number-pad"
                value={values.hourRate}
                placeholder="Hour Rate"
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

export default Project;
