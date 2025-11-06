import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Linking, Pressable, ImageBackground, PressableStateCallbackType, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { sixMonthCourses, sixWeekCourses } from '../data/courses';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * HomeScreen References:
 * 
 * Technical Documentation:
 * Microsoft, 2025. TypeScript Documentation – Get Started. [online] 
 * Available at: https://www.typescriptlang.org/docs/ [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Using TypeScript in React Native. [online] 
 * Available at: https://reactnative.dev/docs/typescript [Accessed 04 November 2025].
 * 
 * React Navigation Team, 2025. Getting Started – React Navigation. [online] 
 * Available at: https://reactnavigation.org/docs/getting-started/ [Accessed 04 November 2025].
 * 
 * React Navigation Team, 2025. Type Checking with TypeScript – React Navigation. [online] 
 * Available at: https://reactnavigation.org/docs/typescript/ [Accessed 04 November 2025].
 * 
 * W3Schools, 2025. React Native Tutorial. [online] 
 * Available at: https://www.w3schools.com/react/react_native_intro.asp [Accessed 04 November 2025].
 * 
 * Image References Used in HomeScreen:
 * Leadership, 2022. Education images. [electronic print]. 
 * Available at: <Increasing Education Budget Inline With SDG Goals> [Accessed 08 August 2025].
 * (Used for: Hero section background image)
 * 
 * Physical sports aid, 2023. First Aid images. [electronic print]. 
 * Available at: <Sports Physio Kit | Physical Sports First Aid> [Accessed 08 August 2025].
 * (Used for: First Aid course preview image)
 * 
 * Shuttershock.com, 01 December 2022. Cooking images. [electronic print]. 
 * Available at: <Traditional Way Preparing Thai Food Using Stock Photo 636553817 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Cooking course preview image)
 * 
 * Shuttershock.com, 22 April 2022. Child minding images. [electronic print]. 
 * Available at: <Children Kindergarten Teacher Reading Together Book Stock Photo 187868201 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Child Minding course preview image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 */

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type PressableState = { pressed: boolean; hovered?: boolean };
type NavLink = keyof RootStackParamList;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCoursesDropdown, setShowCoursesDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFeedback, setSearchFeedback] = useState('');

  // For simplicity in this example, we'll consider 'Home' as the active route.
  // In a real app, you would get the current route name from the navigation state.
  const activeRoute = 'Home';

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'AboutScreen', label: 'About Us' },
    // The 'Courses' dropdown is handled separately in the JSX
    { name: 'MeetTheTeam', label: 'Meet the Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login' as keyof RootStackParamList);
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup' as keyof RootStackParamList);
  };

  const generalInfoSearch = [
    { keywords: ['about', 'story', 'mission', 'vision', 'who we are'], screen: 'AboutScreen' as const },
    { keywords: ['team', 'founder', 'staff', 'precious radebe', 'instructors'], screen: 'MeetTheTeam' as const },
    { keywords: ['contact', 'phone', 'email', 'address', 'location', 'map', 'get in touch'], screen: 'Contact' as const },
    { keywords: ['faq', 'questions', 'payment', 'enrollment', 'enroll'], screen: 'Contact' as const },
    { keywords: ['fee', 'calculator', 'discount', 'price', 'cost', 'select course'], screen: 'CourseSelection' as const },
    { keywords: ['six month', '6 month', 'long courses'], screen: 'SixMonthCourses' as const },
    { keywords: ['six week', '6 week', 'short courses'], screen: 'SixWeekCourses' as const },
    { keywords: ['login', 'sign in', 'portal'], screen: 'Login' as const },
    { keywords: ['signup', 'sign up', 'register', 'create account'], screen: 'Signup' as const },
  ];

  const handleSearch = () => {
    setSearchFeedback(''); // Clear previous feedback

    if (!searchQuery.trim()) {
      setSearchFeedback('Please enter a course name, program, or info to search.');
      return;
    }

    const allCourses = [...sixMonthCourses, ...sixWeekCourses];
    const lowerCaseQuery = searchQuery.toLowerCase();

    // 1. Search for general info and pages first
    for (const info of generalInfoSearch) {
      if (info.keywords.some(keyword => lowerCaseQuery.includes(keyword))) {
        navigation.navigate(info.screen);
        return;
      }
    }

    // 2. If no general info found, search for courses
    const courseResults = allCourses.filter(course => 
      course.title.toLowerCase().includes(lowerCaseQuery) ||
      course.description.toLowerCase().includes(lowerCaseQuery)
    );

    if (courseResults.length === 1) {
      const course = courseResults[0];
      const screenMap: { [key: string]: keyof RootStackParamList } = {
        'first-aid': 'FirstAidCourse',
        'sewing': 'SewingCourse',
        'landscaping': 'LandscapingCourse',
        'life-skills': 'LifeSkillsCourse',
        'cooking': 'CookingCourse',
        'child-minding': 'ChildMindingCourse',
        'garden-maintenance': 'GardenMaintenanceCourse',
      };
      const screenName = screenMap[course.id];
      if (screenName) {
        navigation.navigate(screenName);
      } else {
        // Fallback to a generic course detail or selection screen if mapping is missing
        navigation.navigate('CourseSelection', { searchQuery });
      }
    } else if (courseResults.length > 1) {
      // Navigate to the course selection screen to show multiple results
      navigation.navigate('CourseSelection', { searchQuery });
    } else {
      // 3. If no courses found either, show no results
      setSearchFeedback(`No results found for "${searchQuery}".`);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>
          <Icon name="phone" size={20} /> +27 11 123 4567 | <Icon name="envelope" size={20} /> info@empoweringthenation.org.za
        </Text>
        {/* Dropdown Menu for Login/Signup */}
        <View style={styles.dropdownContainer}>
          <TouchableOpacity 
            onPress={() => setShowDropdown(!showDropdown)}
            style={styles.dropdownTrigger}
          >
            <Icon name="bars" size={20} color="#fff" />
            <Icon name={showDropdown ? "caret-up" : "caret-down"} size={16} color="#fff" style={styles.dropdownCaret} />
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={handleLogin}
              >
                <Text style={styles.dropdownItemText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dropdownItem}
                onPress={handleSignup}
              >
                <Text style={styles.dropdownItemText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/LOGO.png')} style={styles.logo} />
          <Text style={styles.orgName}>Empowering the Nation</Text>
        </View>
        <View style={styles.navMenu}>
          {/* Standard Nav Links */}
          <Pressable
            key="Home"
            onPress={() => handleNavigation('Home')}
            onHoverIn={() => setHoveredLink('Home')}
            onHoverOut={() => setHoveredLink(null)}
            style={[styles.navLinkContainer, (activeRoute === 'Home' || hoveredLink === 'Home') && styles.navLinkHoverActive]}
          >
            <Text style={[styles.navLink, (activeRoute === 'Home' || hoveredLink === 'Home') && styles.navLinkTextHoverActive]}>
              Home
            </Text>
          </Pressable>

          {/* Courses Dropdown */}
          <View style={styles.dropdownNavContainer}>
            <Pressable
              onPress={() => setShowCoursesDropdown(!showCoursesDropdown)}
              style={[styles.navLinkContainer, (showCoursesDropdown || hoveredLink === 'SixMonthCourses' || hoveredLink === 'SixWeekCourses') && styles.navLinkHoverActive]}
            >
              <Text style={[styles.navLink, (showCoursesDropdown || hoveredLink === 'SixMonthCourses' || hoveredLink === 'SixWeekCourses') && styles.navLinkTextHoverActive]}>
                Courses <Icon name={showCoursesDropdown ? "caret-up" : "caret-down"} size={16} />
              </Text>
            </Pressable>
            {showCoursesDropdown && (
              <View style={styles.navDropdownMenu}>
                <TouchableOpacity style={styles.navDropdownItem} onPress={() => handleNavigation('SixMonthCourses')}>
                  <Text style={styles.navDropdownItemText}>Six-Month Courses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navDropdownItem} onPress={() => handleNavigation('SixWeekCourses')}>
                  <Text style={styles.navDropdownItemText}>Six-Week Courses</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {navLinks.filter(link => link.name !== 'Home').map((link) => {
            const isActive = activeRoute === link.name;
            const isHovered = hoveredLink === link.name;
            return (
              <Pressable
                key={link.name}
                onPress={() => handleNavigation(link.name as NavLink)}
                onHoverIn={() => setHoveredLink(link.name)}
                onHoverOut={() => setHoveredLink(null)}
                style={[styles.navLinkContainer, (isActive || isHovered) && styles.navLinkHoverActive]}
              >
                <Text style={[styles.navLink, (isActive || isHovered) && styles.navLinkTextHoverActive]}>
                  {link.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Breadcrumb */}
      <View style={styles.breadcrumb}>
        <View style={styles.breadcrumbContainer}>
          <TouchableOpacity onPress={() => handleNavigation('Home')}>
            <Text style={styles.breadcrumbLink}>Home</Text>
          </TouchableOpacity>
          <Text style={styles.breadcrumbSeparator}> &gt; </Text>
          <Text style={styles.breadcrumbCurrent}>Welcome</Text>
        </View>
      </View>

      {/* Hero Section */}
      <View>
        <ImageBackground
          source={require('../assets/images/homepage.jpg')}
          style={styles.hero}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Empowering the Nation Through Education</Text>
            <Text style={styles.heroSubtitle}>Transform your future with our specialized skills training programs designed for domestic workers and gardeners.</Text>
            
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Icon name="search" size={20} color="#6c757d" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for courses, programs, or information..."
                  value={searchQuery}
                  onChangeText={(text) => {
                    setSearchQuery(text);
                    if (searchFeedback) {
                      setSearchFeedback('');
                    }
                  }}
                  onSubmitEditing={handleSearch} // Allows searching by pressing Enter
                />
              </View>
              <Pressable
                style={({ hovered }: PressableState) => [styles.searchButton, hovered && styles.searchButtonHover]} onPress={handleSearch}
              >
                <Text style={styles.searchButtonText}>Search</Text>
              </Pressable>
            </View>
            {searchFeedback ? (
              <Text style={styles.searchFeedbackText}>{searchFeedback}</Text>
            ) : null}

            <Pressable
              style={({ hovered }: PressableState) => [styles.heroBtn, hovered && styles.btnHover]}
              onPress={() => handleNavigation('CourseSelection')}>
              <Text style={styles.btnText}>EXPLORE OUR COURSES</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      {/* Stats Section */}
      <View style={styles.stats}>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Students Trained</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Courses Offered</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>95%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Years of Excellence</Text>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={[styles.section, { marginTop: 40 }]}>
        <Text style={styles.sectionTitle}>Why Choose Us</Text>
        <View style={styles.featuresGrid}>
          <Pressable style={({ hovered }: PressableState) => [styles.featureCard, hovered && styles.featureCardHover]}>
            <Icon name="graduation-cap" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Quality Education</Text>
            <Text style={styles.featureText}>Our courses are designed by industry experts to provide practical, real-world skills.</Text>
          </Pressable>
          <Pressable style={({ hovered }: PressableState) => [styles.featureCard, hovered && styles.featureCardHover]}>
            <Icon name="users" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Expert Instructors</Text>
            <Text style={styles.featureText}>Learn from professionals with years of experience in their respective fields.</Text>
          </Pressable>
          <Pressable style={({ hovered }: PressableState) => [styles.featureCard, hovered && styles.featureCardHover]}>
            <Icon name="heart" size={40} color="#CFB53B" style={styles.featureIcon} />
            <Text style={styles.featureTitle}>Community Impact</Text>
            <Text style={styles.featureText}>Join a movement that's transforming lives and uplifting communities across South Africa.</Text>
          </Pressable>
        </View>
      </View>

      {/* Courses Preview */}
      <View style={[styles.section, styles.coursesPreview, { marginTop: 40 }]}>
        <Text style={styles.sectionTitle}>Our Popular Courses</Text>
        <View style={styles.coursesGrid}>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>

              <Image 
                source={require('../assets/images/first-aid.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>First Aid Training</Text>
              <Text style={styles.courseText}>Learn essential life-saving skills with our comprehensive first aid course.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('FirstAidCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>
              <Image 
                source={require('../assets/images/cooking-course.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>Cooking & Nutrition</Text>
              <Text style={styles.courseText}>Master the art of preparing nutritious, balanced meals for modern households.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('CookingCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.courseCard}>
            <View style={styles.courseCardImageContainer}>
              <Image 
                source={require('../assets/images/child-minding-course.jpg')} 
                style={styles.courseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>Child Minding</Text>
              <Text style={styles.courseText}>Gain expertise in early childhood development and create safe environments for children.</Text>
              <Pressable
                style={({ hovered }: PressableState) => [styles.btnOutline, hovered && styles.btnOutlineHover]}
                onPress={() => handleNavigation('ChildMindingCourse')}
              >
                <Text style={styles.btnOutlineText}>LEARN MORE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={[styles.section, styles.aboutSection, { marginTop: 40 }]}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.bodyText}>
          Founded in 2018 by Precious Radebe, <Text style={{fontWeight: 'bold'}}>Empowering the Nation</Text> was born from personal experience—watching family members struggle due to lack of formal education and skills training. 
          Our initiative provides the chances they never had: opportunities to rise above circumstances and create better futures.
        </Text>
        <Text style={styles.bodyText}>
          We specialize in upskilling domestic workers and gardeners who have traditionally been overlooked in the professional landscape. 
          These individuals are often the backbone of households, yet their contributions frequently go undervalued. 
          Our programs change this by offering specialized training that enhances skills, earning potential, dignity, and self-confidence.
        </Text>
        <Pressable
          style={({ hovered }: PressableState) => [styles.goldBtn, { alignSelf: 'center', marginTop: 30 }, hovered && styles.goldBtnHover]}
          onPress={() => handleNavigation('AboutScreen')}
        >
          <Text style={styles.goldBtnText}>LEARN MORE ABOUT US</Text>
        </Pressable>
      </View>

      {/* Testimonials */}
      <View style={[styles.section, styles.testimonials, { marginTop: 40 }]}>
        <Text style={[styles.sectionTitle, styles.testimonialsTitle]}>Success Stories</Text>
        <View style={styles.testimonialGrid}>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"The First Aid course changed my life. I now have a valuable skill that makes me more employable and confident."</Text>
            <Text style={styles.testimonialAuthor}>- Sarah M., Course Graduate</Text>
          </View>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"After completing the Landscaping course, I started my own small business. I'm now earning three times what I did before."</Text>
            <Text style={styles.testimonialAuthor}>- John D., Course Graduate</Text>
          </View>
          <View style={styles.testimonialCard}>
            <Text style={styles.testimonialText}>"Empowering the Nation provided my domestic worker with training that significantly improved her skills. It's been beneficial for everyone."</Text>
            <Text style={styles.testimonialAuthor}>- Susan P., Employer</Text>
          </View>
        </View>
      </View>

      {/* Call to Action */}
      <View style={[styles.cta, { marginTop: 40 }]}>
        <Text style={styles.ctaTitle}>Ready to Transform Your Future?</Text>
        <Text style={styles.ctaText}>Join hundreds of individuals who have elevated their skills and changed their lives through our programs.</Text>
        <Pressable
          style={({ hovered }: PressableState) => [styles.goldBtn, { marginTop: 20 }, hovered && styles.goldBtnHover]}
          onPress={() => handleNavigation('Signup')}
        >
          <Text style={styles.goldBtnText}>ENROLL TODAY</Text>
        </Pressable>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { marginTop: 40 }]}>
        <View style={styles.footerGrid}>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Empowering the Nation</Text>
            <Text style={styles.footerText}>Transforming lives through skills development and education since 2018.</Text>
            <View style={styles.socialLinks}>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://facebook.com')}>
                <Icon name="facebook-f" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://twitter.com')}>
                <Icon name="twitter" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://instagram.com')}>
                <Icon name="instagram" size={16} color="#fff" />
              </Pressable>
              <Pressable style={({ hovered }: PressableState) => [styles.socialLink, hovered && styles.socialLinkHover]} onPress={() => openLink('https://linkedin.com')}>
                <Icon name="linkedin" size={16} color="#fff" />
              </Pressable>
            </View>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Quick Links</Text>
            <Pressable onPress={() => handleNavigation('Home')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Home</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixMonthCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Month Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('SixWeekCourses')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Six-Week Courses</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('CourseSelection')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Course Selection</Text>}
            </Pressable>
            <Pressable onPress={() => handleNavigation('Contact')}>
              {({ hovered }: PressableState) => <Text style={[styles.footerLink, hovered && styles.footerLinkHover]}>Contact Us</Text>}
            </Pressable>
          </View>
          <View style={styles.footerColumn}>
            <Text style={styles.footerHeading}>Contact Info</Text>
            <Text style={styles.contactInfoItem}><Icon name="map-marker" size={16} color="#CFB53B" /> 123 Education St, Johannesburg, South Africa</Text>
            <Text style={styles.contactInfoItem}><Icon name="phone" size={16} color="#CFB53B" /> +27 11 123 4567</Text>
            <Text style={styles.contactInfoItem}><Icon name="envelope" size={16} color="#CFB53B" /> info@empoweringthenation.org.za</Text>
          </View>
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>&copy; 2025 Empowering the Nation. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
  },
  topBar: {
    backgroundColor: '#004225',
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    minHeight: 40,
    fontSize: 15,
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
  topBarLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarLinkText: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    right: 200,
    top: 8,
    textAlign: 'center',
  },
  threeLineText: {
    fontSize: 12,
    lineHeight: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    zIndex: 999,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80, // Increased from 60
    height: 80, // Increased from 60
    marginRight: 15,
  },
  orgName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#004225',
  },
  navMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    flex: 2,
  },
  navLinkContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginHorizontal: 4,
    marginVertical: 2,
  },
  navLinkHoverActive: {
    backgroundColor: '#e6f0f7',
  },
  navLink: {
    fontSize: 20,
    color: '#000000ff',
    fontWeight: '500',
    textAlign: 'center',
  },
  navLinkTextHoverActive: {
    color: '#1F6357',
  },
  hamburger: {
    display: 'none',
  },
  breadcrumb: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    fontSize: 14,
    color: '#0055a5',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: '#6c757d',
    marginHorizontal: 5,
  },
  breadcrumbCurrent: {
    fontSize: 14,
    color: '#000000ff',
  },
  hero: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 100,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    height: 580, // Increased height to give more space
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    top: 120,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    maxWidth: 800,
    top: 160,
  },
  btn: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,    
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center', // Added text alignment
    width: '100%', // Ensure text takes full width
  },
  heroBtn: {
    backgroundColor: '#004225',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 3,
    top: 170,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
  },
  btnHover: {
    backgroundColor: '#002a18',
  },
  stats: {
    backgroundColor: '#CFB53B',
    padding: 20,
    height: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
    margin: 5,
    minWidth: 120,
  },
  statNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#004225',
  },
  statLabel: {
    fontSize: 16,
    color: '#000000ff',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '25%',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  featureCard: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 4,
    borderTopColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 300,
    minWidth: 300,
    maxWidth: 350,
    marginHorizontal: 10,
  },
  featureCardHover: {
    transform: [{ translateY: -5}],
    shadowOpacity: 0.5,
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
    borderTopColor: '#CFB53B',
    backgroundColor: '#c4c4c4',
  },
  featureIcon: {
    marginBottom: 30,
    top: 50,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    top: 60,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#004225',
    textAlign: 'center',
    top: 70,
  },  
  coursesPreview: {
    backgroundColor: '#ffffffff',
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    alignContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    height: 450,
    backgroundColor: '#ffffffff',
  },
  courseCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    elevation: 3,
    flex: 1,
    minWidth: 320,
    maxWidth: 380,
    height: 380,
    marginHorizontal: 10,
    overflow: 'hidden',
  },
  courseCardImageContainer: {
    height: 180,
    width: '100%',
  },
  courseImage: {
    width: '100%',
    height: '100%',
  },
  courseContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },  
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 10,
    top: 20,
  },
  courseText: {
    fontSize: 16,
    color: '#004225',
    textAlign: 'center',
    marginBottom: 15,
  },
  btnOutline: {
    backgroundColor: '#004225',
    paddingVertical: 12, // Increased padding
    paddingHorizontal: 40,// Increased padding
    borderRadius: 2,
    width: 200,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    height: 45, // Increased height
  },
  btnOutlineText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16, // Increased font size
    textAlign: 'center',
    width: '100%', // Ensure text takes full width
  },
  btnOutlineHover: {
    backgroundColor: '#002a18',
  },
  aboutSection: {
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    padding: 20,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#002a18',
    marginBottom: 15,
    textAlign: 'left',
    left: 30,
    right: 30,
    width: 1000,
  },
  testimonials: {
    backgroundColor: '#002a18',
    padding: 20,
    textAlign: 'center',
    height: 400,
  },
  testimonialsTitle: {
    color: '#ffffffff',
    borderBottomColor: '#CFB53B',
  },
  testimonialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    width: '100%',
    alignContent: 'center', 
  },
  testimonialCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    flexBasis: '30%',
    height: 250,
    minWidth: 300,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    top: 30,
  },
  cta: {
    backgroundColor: '#ffffffff',
    padding: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 20,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    backgroundColor: '#002a18',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  footerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  footerColumn: {
    marginBottom: 20,
    flex: 1,
    minWidth: 250,
    left: 100,
    right: 100,
  },
  footerHeading: {
    color: '#fff',
    marginBottom: 20,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 3,
    borderBottomColor: '#CFB53B',
    width: 200,
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 5,
  },
  socialLinks: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 12,
  },
  socialLink: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLinkHover: {
    backgroundColor: '#CFB53B',
  },
  footerLink: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  footerLinkHover: {
    color: '#CFB53B',
  },
  contactInfoItem: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 15,
  },
  copyright: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 20,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  // New styles for dropdown and search
  dropdownContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    right: 200,
    top: 8,
  },
  dropdownCaret: {
    marginLeft: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1002,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#002a18',
    fontWeight: '500',
  },
  dropdownNavContainer: {
    position: 'relative',
    zIndex: 1001,
  },
  navDropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#fff',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 180,
    borderWidth: 1,
    borderColor: '#eee',
    zIndex: 1002,
  },
  navDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  navDropdownItemText: {
    fontSize: 16,
    color: '#004225',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
    maxWidth: 600,
    height: 60,
    top: 180,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    textAlign: 'center',
    width: '100%',
  },
  searchIcon: {
    marginRight: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
  },
  searchButton: {
    backgroundColor: '#CFB53B',
    paddingHorizontal: 25,
    justifyContent: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    width: 100,
    textAlign: 'center',
  },
  searchButtonText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  searchButtonHover: {
    backgroundColor: '#bcae35',
  },
  searchFeedbackText: {
    color: '#CFB53B',
    backgroundColor: 'rgba(176, 12, 0, 0.8)',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
    top: 180,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '80%',
    maxWidth: 600,
  },
  // New gold button styles
  goldBtn: {
    backgroundColor: '#CFB53B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  goldBtnText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 18,
  },
  goldBtnHover: {
    backgroundColor: '#bcae35',

    
  },
});

export default HomeScreen;