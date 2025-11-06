import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Linking, TouchableOpacity, Pressable } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { sixMonthCourses, sixWeekCourses } from '../data/courses';

type CourseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

interface Props {
  route: CourseDetailScreenRouteProp;
}

const CourseDetailScreen: React.FC<Props> = ({ route }) => {
  const { courseId, courseType } = route.params;
  
  const course = courseType === 'six-month' 
    ? sixMonthCourses.find(c => c.id === courseId)
    : sixWeekCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Course not found</Text>
      </View>
    );
  }

  const handleEnroll = () => {
    // In a real app, this would navigate to the enrollment screen
    const subject = 'Course Enrollment';
    Linking.openURL(`https://mail.google.com/mail/?view=cm&fs=1&to=admissions@empoweringthenation.org.za&su=${encodeURIComponent(subject)}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image source={course.image} style={styles.image} resizeMode="cover" />
      
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.price}>R{course.price}</Text>
        
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.description}>{course.description}</Text>

        <Text style={styles.sectionTitle}>Course Highlights</Text>
        {course.highlights.map((highlight, index) => (
          <View key={index} style={styles.highlight}>
            <Text style={styles.highlightTitle}>{highlight.title}</Text>
            <Text style={styles.highlightOverview}>{highlight.overview}</Text>
            {highlight.items && highlight.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.highlightItem}>• {item}</Text>
            ))}
            {highlight.project && (
              <>
                <Text style={styles.projectLabel}>Hands-On Project:</Text>
                <Text style={styles.projectText}>{highlight.project}</Text>
              </>
            )}
            {highlight.audience && (
              <>
                <Text style={styles.audienceLabel}>Who Should Enroll:</Text>
                <Text style={styles.audienceText}>{highlight.audience}</Text>
              </>
            )}
          </View>
        ))}

        <Text style={styles.sectionTitle}>Benefits</Text>
        {course.benefits.map((benefit, index) => (
          <Text key={index} style={styles.benefit}>• {benefit}</Text>
        ))}

        <Text style={styles.sectionTitle}>Who Should Enroll</Text>
        {course.whoShouldEnroll.map((item, index) => (
          <Text key={index} style={styles.audienceText}>{item}</Text>
        ))}

        <Pressable style={styles.enrollButton} onPress={handleEnroll}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0055a5',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f57f29',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0055a5',
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 10,
  },
  highlight: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#0055a5',
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0055a5',
    marginBottom: 8,
  },
  highlightOverview: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  highlightItem: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginBottom: 4,
  },
  projectLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f57f29',
    marginTop: 10,
  },
  projectText: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  audienceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0055a5',
    marginTop: 10,
  },
  audienceText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  benefit: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    marginLeft: 10,
  },
  enrollButton: {
    backgroundColor: '#0055a5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CourseDetailScreen;

/*reference links to the pictures guys. Pinterest, 2025. Pin: 320881542220542951. [online] Available at: <https://za.pinterest.com/pin/320881542220542951/> [Accessed 1November 2025]
Pinterest, 2025. Pin: 250794272993798934. [online] Available at: <https://za.pinterest.com/pin/250794272993798934/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 684687949635079876. [online] Available at: <https://za.pinterest.com/pin/684687949635079876/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174977846586. [online] Available at: <https://za.pinterest.com/pin/211174977846586/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 70650287899922509. [online] Available at: <https://za.pinterest.com/pin/70650287899922509/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 711991022380831995. [online] Available at: <https://za.pinterest.com/pin/711991022380831995/> [Accessed 1 November 2025
Pinterest, 2025. Pin: 1125968725265654. [online] Available at: <https://za.pinterest.com/pin/1125968725265654/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174978692598. [online] Available at: <https://za.pinterest.com/pin/211174978692598/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 89157267629136148. [online] Available at: <https://za.pinterest.com/pin/89157267629136148/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 4596627232152979456. [online] Available at: <https://za.pinterest.com/pin/4596627232152979456/> [Accessed 1 November 2025]*/