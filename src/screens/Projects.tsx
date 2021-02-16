import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { Formik, Field, Form, FormikHelpers } from "formik";

import { ModalView } from "../components/ModalView";
import ProjectDbService from "../services/db/ProjectDbService";
import { AppContext } from "../contexts";
import { Project } from "../models";
import { ListItem } from "../components/ListItem";

function Projects(): React.ReactElement {
  const dbInstance = useContext(AppContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const navigation = useNavigation();

  const handleCloseModal = useCallback(() => setIsOpenModal(false), []);
  const handleOpenModal = useCallback(() => setIsOpenModal(true), []);

  const projectService = useMemo(() => {
    if (dbInstance) return new ProjectDbService(dbInstance);
  }, [dbInstance]);

  const handleSubmitForm = useCallback(
    (projectParams: Project) => {
      console.log(moment().unix());
      projectService
        ?.createProject({
          ...projectParams,
          createdAt: moment().toISOString(),
        })
        .then((project) => {
          setProjects([...projects, project]);
          handleCloseModal();
        });
    },
    [projectService, handleCloseModal, projects]
  );

  const handleProjectClick = useCallback(
    (id: number) => () => {
      // navigation.navigate("Tasks", {
      //   id,
      // });
      projectService?.deleteProject(id).then(() => {
        const filteredProjects = projects.filter(
          (project) => project.id !== id
        );

        setProjects(filteredProjects);
      });
    },
    [projects]
  );

  useEffect(() => {
    projectService?.getProjects().then(setProjects);
  }, [projectService]);

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            label={`${project.id}. ${project.title}`}
            onPress={handleProjectClick(project.id)}
          />
        ))}
      </ScrollView>

      <ModalView
        isOpen={isOpenModal}
        title="Add project"
        onClose={handleCloseModal}
      >
        <Formik
          initialValues={{ title: "" } as Project}
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
                placeholder="Project Name"
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

export default Projects;
