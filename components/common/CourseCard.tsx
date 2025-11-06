import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  courseType: 'six-month' | 'six-week';
  onPress?: () => void; // ADD THIS LINE
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  id, 
  title, 
  description, 
  price, 
  image, 
  courseType,
  onPress // ADD THIS LINE
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    // Use the onPress prop if provided, otherwise use default navigation
    if (onPress) {
      onPress();
    } else {
      // Map course IDs to specific screens
      const screenMap: { [key: string]: keyof RootStackParamList } = {
        'first-aid': 'FirstAidCourse',
        'sewing': 'SewingCourse',
        'landscaping': 'LandscapingCourse',
        'life-skills': 'LifeSkillsCourse',
        'child-minding': 'ChildMindingCourse',
      };

      const screenName = screenMap[id];
      if (screenName) {
        navigation.navigate(screenName);
      } else {
        // Fallback to generic course detail
        navigation.navigate('CourseDetail', { courseId: id, courseType });
      }
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description} numberOfLines={2}>{description}</Text>
        <Text style={styles.price}>R{price}</Text>
        <Text style={styles.cta}>Learn More →</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0055a5',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f57f29',
    marginBottom: 8,
  },
  cta: {
    fontSize: 14,
    color: '#0055a5',
    fontWeight: '600',
  },
});

export default CourseCard;