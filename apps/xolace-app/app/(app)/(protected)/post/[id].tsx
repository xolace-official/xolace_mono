import { View } from 'react-native';

import PostBottomSheet from '../../../../components/PostBottomSheet';
import { DetailCard } from '../../../../components/cards/PostDetailsCard';

const PostDetail = () => {
  return (
    <View className="flex-1 dark:bg-background">
      <DetailCard />
      <PostBottomSheet />
    </View>
  );
};

export default PostDetail;
