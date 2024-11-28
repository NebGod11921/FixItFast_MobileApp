import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
interface DatePickerExampleProps {
  appointmentDate?: Date;
  onDateChange: (date: Date) => void;
}

const DatePickerExample: React.FC<DatePickerExampleProps> = ({
  appointmentDate,
  onDateChange,
}) => {
  const [date, setDate] = React.useState(appointmentDate || new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(selectedDate);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Selected Date: {date.toLocaleDateString()}</Text>
      <Button onPress={() => setShow(true)} title="Pick a date" />

      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerExample;
