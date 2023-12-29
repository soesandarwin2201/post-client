import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

const ReplyItem = ({reply, onMention}) => {
  const handleMention = () => {
    onMention(reply.name);
  };

  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity: fadeIn}]}>
      <View style={styles.replyInfo}>
        <Image style={styles.image} source={require('../assets/person.jpg')} />
        <View style={styles.singleComment}>
          <Text style={styles.name}>{reply.name}</Text>
          <Text style={styles.reply}>{reply.body}</Text>
        </View>
      </View>
      <View style={styles.commentContainer}>
        <Text>1hr</Text>
        <TouchableOpacity onPress={() => console.log('it is like')}>
          <Text>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMention}>
          <Text>Reply</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
    marginRight: 8,
  },
  name: {
    fontSize: 10,
    marginBottom: 2,
    marginTop: 3,
    fontWeight: '900',
    marginHorizontal: 15,
  },
  reply: {
    fontSize: 13,
    fontWeight: '400',
    marginHorizontal: 15,
  },
  replyInfo: {
    flexDirection: 'row',
  },
  commentContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 43,
    width: '50%',
    justifyContent: 'space-between',
  },
  singleComment: {
    width: '50%',
    borderColor: '#000',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: '#f5f5f5',
  },
});

export default ReplyItem;
