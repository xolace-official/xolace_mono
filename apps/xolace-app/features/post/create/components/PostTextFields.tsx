import { TextInput, View } from 'react-native';

type PostTextFieldsProps = {
  title: string;
  body: string;
  onChangeTitle: (value: string) => void;
  onChangeBody: (value: string) => void;
};

export const PostTextFields = ({
  title,
  body,
  onChangeTitle,
  onChangeBody,
}: PostTextFieldsProps) => {
  return (
    <View className="mt-6">
      <TextInput
        value={title}
        onChangeText={onChangeTitle}
        maxLength={120}
        placeholder="Title"
        placeholderTextColor="#9ca3af"
        multiline
        className="text-2xl font-semibold text-foreground"
      />
      <TextInput
        value={body}
        onChangeText={onChangeBody}
        placeholder="body text (optional)"
        placeholderTextColor="#94a3b8"
        multiline
        textAlignVertical="top"
        className="mt-3 text-base leading-6 text-foreground"
        style={{ minHeight: 160 }}
      />
    </View>
  );
};
