import { colors } from "@/constants";
import useThemeStore from "@/store/useThemeStore";
import { ThemeMode } from "@/types/common";
import { Children, PropsWithChildren, ReactNode, createContext, useContext } from "react";
import { GestureResponderEvent, Modal, ModalProps, Pressable, PressableProps, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

interface OptionMainProps extends ModalProps {
  children: ReactNode;
  isVisible: boolean;
  hideOption: () => void;
  animationype?: ModalProps['animationType'];
}

interface OptionContextValue {
  onClickOutside?: (event:GestureResponderEvent) => void;
}

const OptionContext = createContext<OptionContextValue | undefined>(undefined);

function OptionMain({
  children, 
  isVisible, 
  hideOption, 
  animationype = 'slide',
  ...props
}:OptionMainProps) {
  const onClickOutside = (event:GestureResponderEvent) => {
    if(event.target === event.currentTarget) {
      hideOption();
    }
  }

  return (
    <Modal 
      visible={isVisible} 
      transparent 
      animationType={animationype}
      onRequestClose={hideOption}
      {...props}
    >
      <OptionContext.Provider value={{onClickOutside}}>
        {children}
      </OptionContext.Provider>
    </Modal>
  )
}

function Background({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  const optionContext = useContext(OptionContext);

  return (
    <SafeAreaView 
      style={styles.optionBackground}
      onTouchEnd={optionContext?.onClickOutside}
    >
      {children}
    </SafeAreaView>
  )
}

function Container({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.optionContainer}>{children}</View>
}

interface ButtonProps extends PressableProps {
  children: ReactNode;
  isDanger?: boolean;
  isChecked?: boolean;
}

function Button({children, isDanger = false, isChecked = false, ...props}: ButtonProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable style={({pressed}) => [
      pressed && styles.optionButtonPressed,
      styles.optionButton
    ]} {...props}>
      <Text style={[styles.optionText, isDanger && styles.dangerText]}>{children}</Text>

      {isChecked && <Ionicons name="checkmark" size={20} color={colors[theme].BLUE_500}/>}
    </Pressable>
  )
}

function Title({children}: PropsWithChildren) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{children}</Text>
    </View>
  )
}

function Divider() {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return <View style={styles.border}/>
}

interface CheckBoxProps extends PressableProps {
  children: ReactNode;
  icon?: ReactNode;
  isChecked?: boolean;
}

function CheckBox({children, icon, isChecked = false, ...props}: CheckBoxProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);

  return (
    <Pressable
      style={({pressed}) => [
        pressed && styles.optionButtonPressed
      ]}
      {...props}
    >

    </Pressable>
  )
}

export const CompoundOption = Object.assign(OptionMain, {
  Container,
  Background,
  Button,
  Title,
  Divider,
});

const styling = (theme: ThemeMode) => StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0 0 0 / 0.5)'
  },
  optionContainer: {
    borderRadius: 15,
    marginHorizontal: 10,
    marginBottom: 7,
    backgroundColor: colors[theme].GRAY_100,
    overflow: 'hidden',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    gap: 5,
  },
  optionButtonPressed: {
    backgroundColor: colors[theme].GRAY_200,
  },
  optionText: {
    fontSize: 17,
    color: colors[theme].BLUE_500,
    fontWeight: '500',
  },
  dangerText: {
    color: colors[theme].RED_500
  },
  titleContainer: {
    alignItems: 'center',
    padding: 15,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors[theme].BLACK,
  },
  border: {
    borderBottomColor: colors[theme].GRAY_200,
    borderBottomWidth: 1,
  }
})