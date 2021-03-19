import React, {
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { SafeAreaView, ScrollView, TextInput, Button } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";

import { ModalView } from "../../components/ModalView";
import ProjectDbService from "../../services/db/ProjectDbService";
import { AppContext } from "../../contexts";
import { Project } from "../../models";
import { ListItem } from "../../components/ListItem";
import ActionButtons from "../../components/ActionButtons";
import { Timer } from "../../components/Timer";
import { Field } from "../../components/Form";

import styles from "../ScreenStyles";
import ProjectForm from "./ProjectModal";

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

  const handleSubmit = useCallback(
    (projectParams: Project) => {
      console.log(moment().unix());
      projectService
        ?.createItem({
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
      navigation.navigate("Project", {
        projectId: id,
      });
    },
    []
  );

  const handleProjectRemoveClick = useCallback(
    (id: number) => () => {
      projectService?.deleteItem(id).then(() => {
        const filteredProjects = projects.filter(
          (project) => project.id !== id
        );

        setProjects(filteredProjects);
      });
    },
    [projects, projectService]
  );

  useEffect(() => {
    projectService?.getList().then(setProjects);
  }, [projectService]);

  return (
    <SafeAreaView style={styles.container}>
      <Timer />

      <ScrollView style={styles.list}>
        {projects.map((project) => (
          <ListItem
            key={project.id}
            label={`${project.id}. ${project.title}`}
            onPress={handleProjectClick(project.id)}
            onRemove={handleProjectRemoveClick(project.id)}
          />
        ))}
      </ScrollView>

      <ProjectForm
        isOpenModal={isOpenModal}
        onSubmit={handleSubmit}
        onClose={handleCloseModal}
      />

      <ActionButtons onPress={handleOpenModal} />
    </SafeAreaView>
  );
}

export default Projects;
