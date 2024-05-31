import { ReactNode } from "react";
import { Modal, ModalProps, SafeAreaView, StyleSheet } from "react-native";

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationype: ModalProps['animationType'];
}

function OptionMain({
  children, 
  isVisible, 
  hideOption, 
  animationype = 'slide',
  ...props
}:OptionMainProps) {
  return (
    <Modal 
      visible={isVisible} 
      transparent 
      animationType={animationype}
      onRequestClose={hideOption}
      {...props}
    >
      <SafeAreaView style={styles.optionBackground}>
        {children}
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)'
  }
})