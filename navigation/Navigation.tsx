import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import SixMonthCoursesScreen from '../screens/SixMonthCoursesScreen';
import SixWeekCoursesScreen from '../screens/SixWeekCoursesScreen';
import CourseSelectionScreen from '../screens/CourseSelectionScreen';
import FeeCalculationResultsScreen from '../screens/FeeCalculationResultsScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// Six-month course screens
import FirstAidCourseScreen from '../screens/FirstAidCourseScreen';
import SewingCourseScreen from '../screens/SewingCourseScreen';
import LandscapingCourseScreen from '../screens/LandscapingCourseScreen';
import LifeSkillsCourseScreen from '../screens/LifeSkillsCourseScreen';

// Six-week course screens
import ChildMindingCourseScreen from '../screens/ChildMindingSixWeekScreen';
import CookingCourseScreen from '../screens/CookingSixWeekScreen';
import GardenMaintenanceCourseScreen from '../screens/GardenMaintenanceSixWeekScreen';

// Import the type
import { RootStackParamList } from '../types/navigation';
import MeetTheTeamScreen from '../screens/MeetTheTeamScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ 
          headerShown: false, // Hide header by default for all screens
          headerStyle: { backgroundColor: '#004225' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Main Screens */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AboutScreen" 
          component={AboutScreen} 
          options={{ title: 'About Us', headerShown: true }}
        />
        <Stack.Screen 
          name="MeetTheTeam" 
          component={MeetTheTeamScreen} 
          options={{ title: 'Meet the Team', headerShown: true }}
        />
        <Stack.Screen 
          name="SixMonthCourses" 
          component={SixMonthCoursesScreen} 
          options={{ title: 'Six-Month Courses', headerShown: true }}
        />
        <Stack.Screen 
          name="SixWeekCourses" 
          component={SixWeekCoursesScreen} 
          options={{ title: 'Six-Week Courses', headerShown: true }}
        />
        <Stack.Screen 
          name="CourseSelection" 
          component={CourseSelectionScreen} 
          options={{ title: 'Course Selection', headerShown: true }}
        />
        <Stack.Screen 
          name="FeeCalculationResults" 
          component={FeeCalculationResultsScreen} 
          options={{ title: 'Fee Calculation', headerShown: true }}
        />
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ title: 'Contact Us', headerShown: true }}
        />

        {/* Authentication Screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login', headerShown: true }}
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Sign Up', headerShown: true }}
        />

        {/* Six-Month Course Detail Screens */}
        <Stack.Screen 
          name="FirstAidCourse" 
          component={FirstAidCourseScreen} 
          options={{ title: 'First Aid Training', headerShown: true }}
        />
        <Stack.Screen 
          name="SewingCourse" 
          component={SewingCourseScreen} 
          options={{ title: 'Sewing Training', headerShown: true }}
        />
        <Stack.Screen 
          name="LandscapingCourse" 
          component={LandscapingCourseScreen} 
          options={{ title: 'Landscaping Training', headerShown: true }}
        />
        <Stack.Screen 
          name="LifeSkillsCourse" 
          component={LifeSkillsCourseScreen} 
          options={{ title: 'Life Skills Training', headerShown: true }}
        />

        {/* Six-Week Course Detail Screens */}
        <Stack.Screen 
          name="ChildMindingCourse" 
          component={ChildMindingCourseScreen} 
          options={{ title: 'Child Minding Training', headerShown: true }}
        />
        <Stack.Screen 
          name="CookingCourse" 
          component={CookingCourseScreen} 
          options={{ title: 'Cooking Training', headerShown: true }}
        />
        <Stack.Screen 
          name="GardenMaintenanceCourse" 
          component={GardenMaintenanceCourseScreen} 
          options={{ title: 'Garden Maintenance Training', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;