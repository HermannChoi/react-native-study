import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SwipeListView } from "react-native-swipe-list-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DATA = [{ timestamp: Date.now(), text: "Sample Text", isChecked: false }];

const index = () => {
  const [text, setText] = React.useState<string>("");
  const [data, setData] = React.useState<Array<any>>(DATA);

  const handleDelete = (item: any) => {
    const res = data.filter((data) => data.timestamp !== item.timestamp);
    setData([...res]);
  };

  const handleAdd = (value: string) => {
    const newData = { timestamp: Date.now(), text: value, isChecked: false };
    setData([...data, newData]);
  };

  const handleCheck = (item: any) => {
    const newData = data.map((dataItem) => {
      if (dataItem.timestamp === item.timestamp) {
        return {
          ...dataItem,
          isChecked: !dataItem.isChecked,
        };
      }
      return dataItem;
    });
    setData(newData);
  };

  const renderItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 30,
          width: wp(80),
          height: wp(80) / 5,
          padding: wp(5),
          marginBottom: 10,
          borderRadius: 20,
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={() => handleCheck(item)}>
          <View
            style={{
              width: wp(5),
              height: wp(5),
              borderWidth: wp(1) / 2,
              borderColor: "#808080",
              borderRadius: wp(1) / 2,
              backgroundColor: item.isChecked ? "green" : "transparent",
            }}
          ></View>
        </Pressable>
        <Text style={{ flex: 1, fontSize: wp(3.5) }}>{item.text}</Text>
        <View
          style={{
            width: wp(3),
            height: wp(3),
            borderRadius: 100,
            backgroundColor: "#000",
          }}
        ></View>
      </View>
    );
  };

  const renderHiddenItem = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: wp(80) / 5,
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Pressable>
          <Text
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: wp(40),
              height: wp(80) / 5,
              paddingLeft: wp(5),
              backgroundColor: "skyblue",
              fontSize: wp(5),
            }}
          >
            👟
          </Text>
        </Pressable>
        <Pressable onPress={() => handleDelete(item)}>
          <Text
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: wp(40),
              height: wp(80) / 5,
              paddingRight: wp(5),
              backgroundColor: "#ff5d00",
              fontSize: wp(5),
            }}
          >
            🗑️
          </Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView bounces={false}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            width: wp(100),
            height: hp(20),
          }}
        >
          <Text style={styles.title}>✅ TO DO LIST</Text>
          <Text style={styles.text}>Hello, this is Yunseok Choi making</Text>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            width: wp(100),
            height: hp(70),
          }}
        >
          <SwipeListView
            data={data}
            renderItem={renderItem}
            renderHiddenItem={renderHiddenItem}
            leftOpenValue={wp(15)}
            rightOpenValue={-wp(15)}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              width: wp(100),
              height: hp(10),
              marginBottom: 30,
            }}
          >
            <TextInput
              placeholder="할 일을 적으세요!"
              placeholderTextColor={"#808080"}
              onChangeText={(text) => setText(text)}
              value={text}
              style={{
                width: wp(70),
                height: hp(5),
                paddingHorizontal: 20,
                borderRadius: 20,
                backgroundColor: "white",
                fontSize: 15,
              }}
            ></TextInput>
            <Pressable
              onPress={() => {
                if (text === "") return alert("the input is empty");
                handleAdd(text);
                setText("");
              }}
              style={{
                width: wp(10),
                height: hp(5),
                borderRadius: 30,
                backgroundColor: "white",
              }}
            >
              <Text
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignContent: "center",
                  width: wp(10),
                  height: hp(5),
                  fontSize: wp(5),
                  textAlign: "center",
                }}
              >
                ＋
              </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#e3e3e3" },
  title: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    textAlign: "center",
  },
});

export default index;
