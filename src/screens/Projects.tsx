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

function Projects(): React.ReactElement {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const navigation = useNavigation();

  const handleToggleModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const handleAddClick = useCallback(() => {
    console.log("add");
    handleToggleModal();
  }, []);

  const handleSubmitForm = useCallback((values: Values) => {
    console.log(values);
  }, []);

  return (
    <SafeAreaView
      style={{ height: "100%", position: "relative", backgroundColor: "#fff" }}
    >
      <ScrollView>
        <Text>Projects screen</Text>
      </ScrollView>

      <ModalView
        isOpen={isOpenModal}
        title="Add project"
        onClose={handleToggleModal}
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
        onPress={handleAddClick}
      >
        <Text>ADD</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Projects;
