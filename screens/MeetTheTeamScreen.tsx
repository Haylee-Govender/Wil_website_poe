import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Linking, Pressable, PressableStateCallbackType, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * MeetTheTeam Screen References:
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
 * Image References Used in MeetTheTeam Screen:
 * Team member profile images sourced from:
 * Unsplash, 2024. Professional Portrait Photography. [online]
 * Available at: https://unsplash.com/s/photos/professional-portrait [Accessed 08 August 2025].
 * 
 * Leadership, 2022. Education images. [electronic print]. 
 * Available at: <Increasing Education Budget Inline With SDG Goals> [Accessed 08 August 2025].
 * (Used for: Team section background image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Component References:
 * React Native Team, 2025. FlatList Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/flatlist [Accessed 04 November 2025].
 * (Used for: Team member cards layout)
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Card Component Design:
 * React Native Team, 2025. View Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/view [Accessed 04 November 2025].
 * 
 * Team Structure Inspiration:
 * Based on educational organization models from:
 * South African Department of Education, 2023. Adult Education and Training Guidelines. [online]
 * Available at: https://www.education.gov.za/ [Accessed 04 November 2025].
 */

/*reference links to the pictures guys. Pinterest, 2025. Pin: 320881542220542951. [online] Available at: <https://za.pinterest.com/pin/320881542220542951/> [Accessed 1November 2025]
Pinterest, 2025. Pin: 250794272993798934. [online] Available at: <https://za.pinterest.com/pin/250794272993798934/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 684687949635079876. [online] Available at: <https://za.pinterest.com/pin/684687949635079876/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174977846586. [online] Available at: <https://za.pinterest.com/pin/211174977846586/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 70650287899922509. [online] Available at: <https://za.pinterest.com/pin/70650287899922509/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 711991022380831995. [online] Available at: <https://za.pinterest.com/pin/711991022380831995/> [Accessed 1 November 2025
Pinterest, 2025. Pin: 1125968725265654. [online] Available at: <https://za.pinterest.com/pin/1125968725265654/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 211174978692598. [online] Available at: <https://za.pinterest.com/pin/211174978692598/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 89157267629136148. [online] Available at: <https://za.pinterest.com/pin/89157267629136148/> [Accessed 1 November 2025]
Pinterest, 2025. Pin: 4596627232152979456. [online] Available at: <https://za.pinterest.com/pin/4596627232152979456/> [Accessed 1 November 2025]
*/

type MeetTheTeamScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MeetTheTeam'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const MeetTheTeamScreen: React.FC = () => {
  const navigation = useNavigation<MeetTheTeamScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const activeRoute = 'MeetTheTeam';

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'MeetTheTeam', label: 'Meet the Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
  ];

  const teamMembers = [
    {
      id: 1,
      name: 'Yashna Ramnath',
      role: 'App Design & Secretary',
      description: 'Yashna is our lead app designer and secretary. With a background in UI/UX design, she ensures our digital platforms are user-friendly and accessible to all users.',
      image: require('../assets/images/Yashna.jpeg'),
    },
    {
      id: 2,
      name: 'Jadene Naidoo',
      role: 'Lead website design & User Interface',
      description: 'Jadene is responsible for the overall design and user interface of our website. Her expertise in web development and design helps create an engaging online experience for our users.',
      image: require('../assets/images/Jadene.jpeg'),
    },
    {
      id: 3,
      name: 'Haylee Govender',
      role: 'Backend Developer of website ',
      description: 'Haylee manages the backend development of our website, ensuring that all functionalities run smoothly and efficiently. Her skills in server-side programming are crucial to our online operations.',
      image: require('../assets/images/Haylee.jpeg'),
    },
    {
      id: 4,
      name: 'Kythera Pather',
      role: 'Backend developer of App',
      description: 'Kythera is our backend developer for the app. She focuses on building robust and scalable backend systems that support our mobile applications, ensuring reliability and performance.',
      image: require('../assets/images/Kythera.jpeg'), 
    },
  ];

  const handleNavigation = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  const handleLogin = () => {
    setShowDropdown(false);
    navigation.navigate('Login' as keyof RootStackParamList);
  };

  const handleSignup = () => {
    setShowDropdown(false);
    navigation.navigate('Signup' as keyof RootStackParamList);
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>
          <Icon name="phone" size={16} /> +27 11 123 4567 | <Icon name="envelope" size={16} /> info@empoweringthenation.org.za
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
          {navLinks.map((link) => {
            const isActive = activeRoute === link.name;
            const isHovered = hoveredLink === link.name;
            return (
              <Pressable
                key={link.name}
                onPress={() => handleNavigation(link.name)}
                onHoverIn={() => setHoveredLink(link.name)}
                onHoverOut={() => setHoveredLink(null)}
                style={[styles.navLinkContainer, (isActive || isHovered) && styles.navLinkHoverActive]}
              >
                <Text style={[styles.navLink, (isActive || isHovered) && styles.navLinkTextHoverActive]}>{link.label}</Text>
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
          <Text style={styles.breadcrumbCurrent}>Meet the Team</Text>
        </View>
      </View>

      {/* Hero Section */}
      <ImageBackground
        source={require('../assets/images/homepage.jpg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.heroOverlay}>
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Meet Our Team</Text>
            <Text style={styles.heroSubtitle}>
              Dedicated Professionals Committed to Your Success
            </Text>
            <Text style={styles.heroDescription}>
              Get to know the passionate individuals behind Empowering the Nation. 
              Our team brings together expertise, experience, and a shared commitment 
              to transforming lives through education.
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Main Content */}
      <View style={styles.section}>
        {/* Introduction */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Our Passionate Team</Text>
          <Text style={styles.description}>
            At Empowering the Nation, we believe that great education requires great educators. 
            Our team consists of industry professionals, experienced instructors, and dedicated 
            support staff who are committed to providing you with the highest quality training 
            and support throughout your educational journey.
          </Text>
        </View>

        {/* Team Grid */}
        <View style={styles.teamGrid}>
          {teamMembers.map((member) => (
            <Pressable
              key={member.id}
              style={({ hovered }: PressableState) => [styles.teamCard, hovered && styles.teamCardHover]}
            >
              <View style={styles.imageContainer}>
                <Image 
                  source={member.image} 
                  style={styles.memberImage}
                  resizeMode="contain"
                />
              </View>
              
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
                <Text style={styles.memberDescription}>{member.description}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Values Section */}
        <View style={styles.valuesSection}>
          <Text style={styles.sectionTitle}>Our Values & Commitment</Text>
          <View style={styles.valuesGrid}>
            <Pressable style={({ hovered }: PressableState) => [styles.valueCard, hovered && styles.valueCardHover]}>
              <Icon name="graduation-cap" size={50} color="#CFB53B" style={styles.valueIcon} />
              <Text style={styles.valueTitle}>Excellence in Education</Text>
              <Text style={styles.valueDescription}>
                We maintain the highest standards in curriculum development and teaching methodologies.
              </Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.valueCard, hovered && styles.valueCardHover]}>
              <Icon name="users" size={50} color="#CFB53B" style={styles.valueIcon} />
              <Text style={styles.valueTitle}>Student-Centered Approach</Text>
              <Text style={styles.valueDescription}>
                Every decision we make is focused on enhancing student learning and success.
              </Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.valueCard, hovered && styles.valueCardHover]}>
              <Icon name="heart" size={50} color="#CFB53B" style={styles.valueIcon} />
              <Text style={styles.valueTitle}>Passion for Empowerment</Text>
              <Text style={styles.valueDescription}>
                We are driven by our mission to empower individuals and transform communities.
              </Text>
            </Pressable>
            <Pressable style={({ hovered }: PressableState) => [styles.valueCard, hovered && styles.valueCardHover]}>
              <Icon name="refresh" size={50} color="#CFB53B" style={styles.valueIcon} />
              <Text style={styles.valueTitle}>Continuous Improvement</Text>
              <Text style={styles.valueDescription}>
                We constantly evolve our programs to meet changing industry needs and student requirements.
              </Text>
            </Pressable>
          </View>
        </View>
        
        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Want to Join Our Team?</Text>
          <Text style={styles.ctaDescription}>
            We're always looking for passionate individuals who share our vision. 
            Check our career opportunities or volunteer positions.
          </Text>
          <View style={styles.ctaButtons}>
            <Pressable
              style={({ hovered }: PressableState) => [styles.ctaButtonOutline, hovered && styles.ctaButtonOutlineHover]}
              onPress={() => navigation.navigate('Contact')}
            >
              <Text style={styles.ctaButtonOutlineText}>VOLUNTEER WITH US</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
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
            <Text style={styles.contactInfoItem}>
              <Icon name="map-marker" size={16} color="#CFB53B" /> 123 Education St, Johannesburg, South Africa
            </Text>
            <Text style={styles.contactInfoItem}>
              <Icon name="phone" size={16} color="#CFB53B" /> +27 11 123 4567
            </Text>
            <Text style={styles.contactInfoItem}>
              <Icon name="envelope" size={16} color="#CFB53B" /> info@empoweringthenation.org.za
            </Text>
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
    zIndex: 1000,
  },
  topBarText: {
    color: '#fff',
    fontSize: 15,
    left: 120,
    top: 8,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 80,
    height: 80,
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
    color: '#004225',
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
  // Hero Section
  hero: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    maxWidth: 800,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  heroSubtitle: {
    fontSize: 24,
    color: '#CFB53B',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  heroDescription: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  contentSection: {
    marginBottom: 40,
    width: '100%',
    maxWidth: 1200,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 30,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    textAlign: 'center',
    width: '50%',
  },
  description: {
    fontSize: 18,
    lineHeight: 28,
    color: '#002a18',
    marginBottom: 20,
    textAlign: 'center',
    maxWidth: 800,
  },
  // Team Grid 
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '100%',
    maxWidth: 1200,
    marginBottom: 50,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '48%', // Adjusted to allow two cards per row
    minWidth: 300, // Ensures readability on smaller screens, allowing wrap to single column
    marginBottom: 30,
    overflow: 'hidden',
  },
  teamCardHover: {
    transform: [{ translateY: -5 }],
    shadowOpacity: 0.2,
  },
  imageContainer: {
    height: 500, 
    width: '100%',
    backgroundColor: '#004225',
    borderBottomWidth: 4,
    borderColor: '#CFB53B',
  },
  memberImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    padding: 25,
  },
  memberName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 16,
    color: '#CFB53B',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  memberDescription: {
    fontSize: 14,
    color: '#002a18',
    lineHeight: 22,
    textAlign: 'center',
  },
  // Values Section
  valuesSection: {
    marginBottom: 50,
    width: '100%',
    maxWidth: 1200,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
  },
  valueCard: {
    backgroundColor: '#D9D9D9',
    flex: 1,
    padding: 30,
    borderRadius: 8,
    alignItems: 'center',
    textAlign: 'center',
    borderTopWidth: 4,
    borderTopColor: '#121212',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 250,
    maxWidth: 280,
    height: 280,
  },
  valueCardHover: {
    transform: [{ translateY: -5 }],
    shadowOpacity: 0.2,
    borderTopColor: '#CFB53B',
    backgroundColor: '#c4c4c4',
  },
  valueIcon: {
    marginBottom: 20,
  },
  valueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 15,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 16,
    color: '#004225',
    textAlign: 'center',
    lineHeight: 22,
  },
  // CTA Section
  ctaSection: {
    backgroundColor: '#002a18',
    padding: 50,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    marginBottom: 30,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    maxWidth: 600,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  ctaButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 220,
  },
  ctaButtonHover: {
    backgroundColor: '#003018',
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  ctaButtonOutline: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CFB53B',
    alignItems: 'center',
    minWidth: 200,
  },
  ctaButtonOutlineHover: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
  },
  ctaButtonOutlineText: {
    color: '#CFB53B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // Footer
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
  // Dropdown styles
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
    color: '#004225',
    fontWeight: '500',
  },
});

export default MeetTheTeamScreen;