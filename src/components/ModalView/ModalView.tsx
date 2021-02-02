import React from "react";
import { Text, TouchableOpacity, Modal, View } from "react-native";
import Icon from "react-native-vector-icons/dist/FontAwesome";

import styles from "./ModalViewStyles";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose?: () => void;
  children?: React.ReactNode;
}

function ModalView({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps): React.ReactElement {
  return (
    <Modal animationType="fade" transparent visible={isOpen}>
      <View style={styles.container}>
        <View style={styles.modalView}>
          {title && (
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="times" size={20} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.modalContent}>{children}</View>
        </View>
      </View>
    </Modal>
  );
}

export default ModalView;
