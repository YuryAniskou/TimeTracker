import React, { useMemo } from "react";
import { Button } from "react-native";
import { Formik } from "formik";
import { ModalView } from "../../components/ModalView";
import { Project } from "../../models";
import { Field } from "../../components/Form";

interface ProjectFormProps {
  isOpenModal: boolean;
  onSubmit: (projectParams: Project) => void;
  onClose?: () => void;
}

function ProjectForm({
  isOpenModal,
  onSubmit,
  onClose,
}: ProjectFormProps): React.ReactElement {
  const initialValues = useMemo(
    () =>
      ({
        title: "",
      } as Project),
    []
  );

  return (
    <ModalView isOpen={isOpenModal} title="Add project" onClose={onClose}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleChange, handleSubmit, values }) => (
          <>
            <Field
              onChangeText={handleChange("title")}
              value={values.title}
              placeholder="Project Name"
            />
            <Field
              onChangeText={handleChange("hourRate")}
              value={values.hourRate}
              placeholder="Hour Rate"
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
    </ModalView>
  );
}

export default ProjectForm;
