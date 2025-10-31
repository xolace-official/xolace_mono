import { View } from 'react-native'
import {DetailCard} from '../../../../components/cards/PostDetailsCard'
import PostBottomSheet from '../../../../components/PostBottomSheet'

const PostDetail = () => {
  return (
    <View className='flex-1'>
      <DetailCard  />
      <PostBottomSheet/>
    </View>
  )
}

export default PostDetail