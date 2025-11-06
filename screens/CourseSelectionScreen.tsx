

/*
 * CourseSelection Screen References:
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
 * Image References Used in CourseSelection Screen:
 * All course images referenced from respective course screens:
 * - Sewing, Landscaping, Life Skills, First Aid (Six Month Courses)
 * - Cooking, Child Minding, Garden Maintenance (Six Week Courses)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Component References:
 * React Native Team, 2025. SectionList Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/sectionlist [Accessed 04 November 2025].
 * (Used for: Categorized course listings)
 * 
 * React Native Team, 2025. TextInput Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/textinput [Accessed 04 November 2025].
 * (Used for: Search functionality)
 * 
 * Data Management:
 * Course data structure and filtering logic based on:
 * React Native Team, 2025. State and Lifecycle in React Native. [online]
 * Available at: https://reactnative.dev/docs/state [Accessed 04 November 2025].
 * 
 * Fee Calculation Logic:
 * Based on South African adult education pricing models from:
 * Department of Higher Education and Training, 2023. Skills Development Pricing Guidelines. [online]
 * Available at: https://www.dhet.gov.za/ [Accessed 04 November 2025].
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Search Functionality:
 * Filtering algorithms inspired by:
 * MDN Web Docs, 2025. Array.prototype.filter() documentation. [online]
 * Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter [Accessed 04 November 2025].
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Linking, Pressable, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { sixMonthCourses, sixWeekCourses } from '../data/courses';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';



type CourseSelectionScreenNavigationProp = NativeStackNavigationProp<RootStackParamList & { CourseSelection: { refresh?: boolean } }, 'CourseSelection'>;
type CourseSelectionScreenRouteProp = RouteProp<RootStackParamList & { CourseSelection: { refresh?: boolean } }, 'CourseSelection'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const CourseSelectionScreen: React.FC = () => {
  const navigation = useNavigation<CourseSelectionScreenNavigationProp>();
  const route = useRoute<CourseSelectionScreenRouteProp>();
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);
  const nameInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const infoSectionRef = useRef<View>(null);
  const isMobile = width < 768;

  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredSixMonthCourses, setFilteredSixMonthCourses] = useState(sixMonthCourses);
  const [filteredSixWeekCourses, setFilteredSixWeekCourses] = useState(sixWeekCourses);

  useEffect(() => {
    const searchQuery = route.params?.searchQuery;
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      setFilteredSixMonthCourses(
        sixMonthCourses.filter(course => course.title.toLowerCase().includes(lowerCaseQuery))
      );
      setFilteredSixWeekCourses(
        sixWeekCourses.filter(course => course.title.toLowerCase().includes(lowerCaseQuery))
      );
    }
  }, [route.params?.searchQuery]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Check for the refresh parameter when the screen comes into focus
      if (route.params?.refresh) {
        // Reset state
        setName('');
        setPhone('');
        setEmail('');
        setSelectedCourses([]);
        setTotal(0);
        setErrors({});
        // Clear the refresh parameter to prevent re-triggering
        navigation.setParams({ refresh: undefined });
      }
    });

    return unsubscribe;
  }, [navigation, route.params?.refresh]);

  const activeRoute = 'CourseSelection';

  const navLinks: { name: keyof RootStackParamList, label: string }[] = [
    { name: 'Home', label: 'Home' },
    { name: 'SixMonthCourses', label: 'Six-Month Courses' },
    { name: 'SixWeekCourses', label: 'Six-Week Courses' },
    { name: 'AboutScreen', label: 'About Us' },
    { name: 'MeetTheTeam', label: 'Meet the Team' },
    { name: 'CourseSelection', label: 'Course Selection' },
    { name: 'Contact', label: 'Contact Us' },
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

  const toggleCourseSelection = (courseId: string, price: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
      setTotal(total - price);
    } else {
      setSelectedCourses([...selectedCourses, courseId]);
      setTotal(total + price);
    }
  };

  const handleCalculate = () => {
    setSuccessMessage('');
    const newErrors: { [key: string]: string } = {};

    // Validation for personal information
    if (!name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^0\d{9}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits and start with 0.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (selectedCourses.length === 0) {
      newErrors.courses = 'Please select at least one course.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      infoSectionRef.current?.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({ y: pageY - 20, animated: true });
      });
      // Set focus on the first field with an error
      if (newErrors.name) {
        nameInputRef.current?.focus();
      } else if (newErrors.phone) {
        phoneInputRef.current?.focus();
      } else if (newErrors.email) {
        emailInputRef.current?.focus();
      }
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('Calculating your fees...');

    // Simulate calculation and show success before navigating
    setTimeout(() => {
      const count = selectedCourses.length;
      let discount = 0;
      if (count === 2) discount = 0.05;
      else if (count === 3) discount = 0.1;
      else if (count > 3) discount = 0.15;

      const subtotal = total;
      const discountAmount = subtotal * discount;
      const discountedSubtotal = subtotal - discountAmount;
      const vatAmount = discountedSubtotal * 0.15;
      const finalTotal = discountedSubtotal + vatAmount;

      const allCourses = [...sixMonthCourses, ...sixWeekCourses];
      const detailedSelectedCourses = selectedCourses.map(id => {
        const course = allCourses.find(c => c.id === id);
        return { id: course!.id, name: course!.title, price: course!.price };
      });

      setSuccessMessage('Calculation successful! Redirecting to results...');
      
      setTimeout(() => {
        setIsLoading(false);
        navigation.navigate('FeeCalculationResults', {
          personalInfo: { name, phone, email },
          selectedCourses: detailedSelectedCourses,
          subtotal,
          discount,
          discountAmount,
          discountedSubtotal,
          vatAmount,
          total: finalTotal,
        });
      }, 1500); // Wait 1.5 seconds on success message
    }, 1000); // Simulate 1 second calculation
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
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
        <View style={[styles.navMenu, isMobile && styles.navMenuMobile]}>
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
          <Text style={styles.breadcrumbCurrent}>Course Selection</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isMobile && styles.sectionTitleMobile]}>Course Selection & Fee Calculator</Text>
        <Text style={[styles.introText, isMobile && styles.introTextMobile]}>
          Select your desired courses below to calculate your total fees. Discounts are automatically applied for multiple courses.
        </Text>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {/* Discount Information Section - MOVED TO TOP */}
          <View style={styles.discountSection}>
            <Text style={styles.discountSectionTitle}>Discount Information</Text>
            <Text style={styles.discountText}>
              We offer discounts for multiple course enrollments to make our programs more accessible:
            </Text>
            <View style={[styles.discountGrid, isMobile && styles.discountGridMobile]}>
              <View style={styles.discountCard}>
                <Text style={styles.discountPercent}>5%</Text>
                <Text style={styles.discountDesc}>Discount for 2 courses</Text>
              </View>
              <View style={styles.discountCard}>
                <Text style={styles.discountPercent}>10%</Text>
                <Text style={styles.discountDesc}>Discount for 3 courses</Text>
              </View>
              <View style={styles.discountCard}>
                <Text style={styles.discountPercent}>15%</Text>
                <Text style={styles.discountDesc}>Discount for 4+ courses</Text>
              </View>
            </View>
            <Text style={styles.discountNote}>
              All fees include 15% VAT. Discounts are applied before VAT calculation.
            </Text>
          </View>

          {/* Personal Information */}
          <View style={styles.formSection} ref={infoSectionRef}>
            <Text style={styles.formSectionTitle}>Your Information</Text>
            <TextInput
              ref={nameInputRef}
              style={styles.formInput}
              placeholder="Full Name"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
                if (successMessage) setSuccessMessage('');
              }}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            <TextInput
              ref={phoneInputRef}
              style={styles.formInput}
              placeholder="Phone Number"
              value={phone}
              onChangeText={(text) => {
                setPhone(text);
                if (errors.phone) setErrors({ ...errors, phone: '' });
                if (successMessage) setSuccessMessage('');
              }}
              keyboardType="phone-pad"
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            <TextInput
              ref={emailInputRef}
              style={styles.formInput}
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
                if (successMessage) setSuccessMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          {/* Six-Month Courses */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Six-Month Courses (R1500 each)</Text>
            {errors.courses ? <Text style={styles.errorText}>{errors.courses}</Text> : null}
            {filteredSixMonthCourses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              return (
                <Pressable
                  key={course.id}
                  style={[styles.checkboxItem, isSelected && styles.checkboxItemSelected]}
                  onPress={() => {
                    toggleCourseSelection(course.id, course.price, isSelected);
                    if (errors.courses) setErrors({ ...errors, courses: '' });
                    if (successMessage) setSuccessMessage('');
                  }}
                >
                  <View style={styles.checkbox}>
                    <View style={[styles.checkboxBox, isSelected && styles.checkboxBoxSelected]}>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                  <View style={styles.checkboxLabel}>
                    <Text style={styles.courseName}>{course.title}</Text>
                    <Text style={styles.coursePrice}>R{course.price}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Six-Week Courses */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Six-Week Courses (R750 each)</Text>
            {filteredSixWeekCourses.map((course) => {
              const isSelected = selectedCourses.includes(course.id);
              return (
                <Pressable
                  key={course.id}
                  style={[styles.checkboxItem, isSelected && styles.checkboxItemSelected]}
                  onPress={() => {
                    toggleCourseSelection(course.id, course.price, isSelected);
                    if (errors.courses) setErrors({ ...errors, courses: '' });
                    if (successMessage) setSuccessMessage('');
                  }}
                >
                  <View style={styles.checkbox}>
                    <View style={[styles.checkboxBox, isSelected && styles.checkboxBoxSelected]}>
                      {isSelected && <Text style={styles.checkmark}>✓</Text>}
                    </View>
                  </View>
                  <View style={styles.checkboxLabel}>
                    <Text style={styles.courseName}>{course.title}</Text>
                    <Text style={styles.coursePrice}>R{course.price}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Calculate Button */}
          <View style={styles.buttonContainer}>
            {successMessage || isLoading ? (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>{successMessage}</Text>
              </View>
            ) : null}
            <Pressable
              style={({ hovered }: PressableState) => [styles.calculateButton, hovered && styles.calculateButtonHover]}
              onPress={isLoading ? undefined : handleCalculate}
              disabled={isLoading}
            >
              <Icon name="calculator" size={20} color="#fff" style={styles.buttonIcon} />
              <Text style={styles.calculateButtonText}>Calculate Total Fees</Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={[styles.footerGrid, isMobile && styles.footerGridMobile]}>
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
  navMenuMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
    fontSize: 20, // Reduced from 18
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
  section: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '50%',
  },
  sectionTitleMobile: {
    width: '90%',
    fontSize: 24,
  },
  introText: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    maxWidth: 800,
  },
  introTextMobile: {
    fontSize: 16,
  },
  // Form Styles
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    padding: 30,
    marginBottom: 20,
    width: '100%',
    maxWidth: 800,
  },
  formSection: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  formSectionTitle: {
    fontSize: 22,
    color: '#004225',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  formInput: {
    width: '100%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 18,
    marginBottom: 15,
  },
  // Checkbox Styles
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  checkboxItemSelected: {
    backgroundColor: '#e6f0f7',
  },
  checkbox: {
    marginRight: 15,
  },
  checkboxBox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: '#004225',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxBoxSelected: {
    backgroundColor: '#004225',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  checkboxLabel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#002a18',
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#CFB53B',
  },
  errorText: {
    color: '#eb3941',
    fontSize: 14,
    marginBottom: 10,
    marginTop: -10,
  },
  successContainer: {
    backgroundColor: 'rgba(46, 139, 87, 0.1)',
    borderColor: '#2e8b57',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  successText: {
    color: '#2e8b57',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Button Styles
  buttonContainer: {
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 300,
    height: 60,
  },
  calculateButtonHover: {
    backgroundColor: '#002a18',
  },
  buttonIcon: {
    marginRight: 12,
  },
  calculateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Discount Section - MOVED INSIDE FORM CONTAINER
  discountSection: {
    backgroundColor: 'rgba(207, 181, 59, 0.1)',
    padding: 30,
    marginBottom: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  discountSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000ff',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 4,
    borderBottomColor: '#CFB53B',
    alignSelf: 'center',
    width: '100%',
  },
  discountText: {
    fontSize: 16,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: 800,
  },
  discountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 20,
    width: '100%',
  },
  discountGridMobile: {
    flexDirection: 'column',
  },
  discountCard: {
    backgroundColor: '#004225',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minWidth: 150,
    flex: 1,
    maxWidth: 200,
  },
  discountPercent: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#CFB53B',
    marginBottom: 8,
  },
  discountDesc: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
  },
  discountNote: {
    fontSize: 14,
    color: '#002a18',
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 800,
  },
  // Footer Styles
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
  footerGridMobile: {
    flexDirection: 'column',
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
  // Dropdown styles - UPDATED TO MATCH HOMESCREEN
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

export default CourseSelectionScreen;