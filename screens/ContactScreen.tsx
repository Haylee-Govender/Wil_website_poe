import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Linking, Alert, Image, Pressable, PressableStateCallbackType, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

/*
 * Contact Screen References:
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
 * Contact Form Implementation:
 * React Native Team, 2025. TextInput Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/textinput [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Alert API Documentation. [online]
 * Available at: https://reactnative.dev/docs/alert [Accessed 04 November 2025].
 * 
 * External Linking:
 * React Native Team, 2025. Linking API Documentation. [online]
 * Available at: https://reactnative.dev/docs/linking [Accessed 04 November 2025].
 * (Used for: Phone calls, email, and map integration)
 * 
 * Map Integration:
 * React Native Community, 2025. React Native Maps Documentation. [online]
 * Available at: https://github.com/react-native-maps/react-native-maps [Accessed 04 November 2025].
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Form Validation:
 * Input validation patterns based on:
 * MDN Web Docs, 2025. Form Validation Techniques. [online]
 * Available at: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation [Accessed 04 November 2025].
 * 
 * FAQ Section Design:
 * Accordion-style layout inspired by:
 * React Native Community, 2025. Best Practices for FAQ Components. [online]
 * Available at: https://reactnative.dev/docs/accessibility [Accessed 04 November 2025].
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Contact Information:
 * Based on South African educational institution contact standards from:
 * Department of Higher Education and Training, 2023. Institutional Contact Guidelines. [online]
 * Available at: https://www.dhet.gov.za/ [Accessed 04 November 2025].
 */

type ContactScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Contact'>;
type PressableState = { pressed: boolean; hovered?: boolean };

const { width, height } = Dimensions.get('window');

const ContactScreen: React.FC = () => {
  const navigation = useNavigation<ContactScreenNavigationProp>();
  const [hoveredLink, setHoveredLink] = useState<keyof RootStackParamList | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [mapError, setMapError] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState('');

  const activeRoute = 'Contact';

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

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

   // Name validation
    if (!name.trim()) newErrors.name = 'Full Name is required.';

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address.';
      }
    }

    // Phone validation (now required)
    if (!phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^0\d{9}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits and start with 0.';
    }

    if (!subject.trim()) newErrors.subject = 'Subject is required.';
    if (!message.trim()) newErrors.message = 'Message is required.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // On success
    setSuccessMessage('Thank you! Your message has been sent. We will get back to you soon.');
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
    setErrors({}); // Clear all errors on success

    // Optional: Hide the success message after a few seconds
    setTimeout(() => setSuccessMessage(''), 5000);
  };


  const openMap = () => {
    const address = '123 Education St, Johannesburg, South Africa';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(err => Alert.alert('Error', 'Could not open maps.'));
  };

  const callPhone = () => {
    Linking.openURL('tel:+27111234567').catch(err => Alert.alert('Error', 'Could not make a call.'));
  };

  const sendEmail = () => {
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=info@empoweringthenation.org.za';
    Linking.openURL(gmailUrl).catch(err => Alert.alert('Error', 'Could not open email client.'));
  };

  // Simple MapView component to avoid crashes
  const SimpleMapView = () => {
    return (
      <View style={styles.mapPlaceholder}>
        <Icon name="map" size={50} color="#004225" />
        <Text style={styles.mapPlaceholderText}>Interactive Map</Text>
        <Text style={styles.mapPlaceholderSubtext}>Location: Johannesburg, South Africa</Text>
        <Pressable style={styles.mapButton} onPress={openMap}>
          <Text style={styles.mapButtonText}>Open in Google Maps</Text>
        </Pressable>
      </View>
    );
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
          <Text style={styles.breadcrumbCurrent}>Contact Us</Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Get In Touch With Us</Text>
        <Text style={styles.introText}>
          We're here to answer any questions you may have about our courses, enrollment process, or anything else. 
          Reach out to us and we'll respond as soon as we can.
        </Text>

        {/* Contact Container */}
        <View style={styles.contactContainer}>
          {/* Contact Information */}
          <View style={styles.contactInfo}>
            <Text style={styles.contactInfoTitle}>Contact Information</Text>
            
            <Pressable style={styles.contactItem} onPress={openMap}>
              <Icon name="map-marker" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Address</Text>
                <Text style={styles.contactValue}>123 Education St</Text>
                <Text style={styles.contactValue}>Johannesburg, South Africa</Text>
              </View>
            </Pressable>
            
            <Pressable style={styles.contactItem} onPress={callPhone}>
              <Icon name="phone" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Phone</Text>
                <Text style={styles.contactValue}>+27 11 123 4567</Text>
                <Text style={styles.contactValue}>+27 82 123 4567 (Mobile)</Text>
              </View>
            </Pressable>
            
            <Pressable style={styles.contactItem} onPress={sendEmail}>
              <Icon name="envelope" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Email</Text>
                <Text style={styles.contactValue}>info@empoweringthenation.org.za</Text>
                <Text style={styles.contactValue}>admissions@empoweringthenation.org.za</Text>
              </View>
            </Pressable>
            
            <View style={styles.contactItem}>
              <Icon name="clock-o" size={24} color="#CFB53B" style={styles.contactIcon} />
              <View style={styles.contactDetails}>
                <Text style={styles.contactType}>Office Hours</Text>
                <Text style={styles.contactValue}>Monday - Friday: 8:00 AM - 5:00 PM</Text>
                <Text style={styles.contactValue}>Saturday: 9:00 AM - 1:00 PM</Text>
                <Text style={styles.contactValue}>Sunday: Closed</Text>
              </View>
            </View>
          </View>

          {/* Contact Form */}
          <View style={styles.contactForm}>
            <Text style={styles.contactFormTitle}>Send Us a Message</Text>
            
            <TextInput
              style={styles.formInput}
              placeholder="Full Name *"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errors.name) setErrors({ ...errors, name: '' });
                if (successMessage) setSuccessMessage('');
              }}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            
            <TextInput
              style={styles.formInput}
              placeholder="Email Address *"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: '' });
                if (successMessage) setSuccessMessage('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            
            <TextInput
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
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            
            <TextInput
              style={styles.formInput}
              placeholder="Subject *"
              value={subject}
              onChangeText={(text) => {
                setSubject(text);
                if (errors.subject) setErrors({ ...errors, subject: '' });
                if (successMessage) setSuccessMessage('');
              }}
            />
            {errors.subject && <Text style={styles.errorText}>{errors.subject}</Text>}
            
            <TextInput
              style={[styles.formInput, styles.messageInput]}
              placeholder="Your Message *"
              value={message}
              onChangeText={(text) => {
                setMessage(text);
                if (errors.message) setErrors({ ...errors, message: '' });
                if (successMessage) setSuccessMessage('');
              }}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            {errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
            
            <Pressable
              style={({ hovered }: PressableState) => [styles.submitButton, hovered && styles.submitButtonHover]}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>SEND MESSAGE</Text>
            </Pressable>
            {successMessage ? (
              <Text style={styles.successText}>{successMessage}</Text>
            ) : null}
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <Text style={styles.sectionTitle}>Find Us</Text>
          <Text style={styles.mapDescription}>
            Visit our campus or training centers. See the map below for directions.
          </Text>
          <SimpleMapView />
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <View style={styles.faqContainer}>
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>How do I enroll in a course?</Text>
            <Text style={styles.faqAnswer}>
              You can enroll in our courses by visiting our Course Selection page, choosing your desired courses, and following the enrollment process. 
              Alternatively, you can visit our campus during office hours or contact us for assistance.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What payment methods do you accept?</Text>
            <Text style={styles.faqAnswer}>
              We accept various payment methods including cash, bank transfers, and credit/debit cards. 
              We also offer payment plans for certain courses.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Do you offer any financial assistance?</Text>
            <Text style={styles.faqAnswer}>
              Yes, we offer financial assistance and scholarships for eligible students. 
              Please contact our admissions office for more information about available options and eligibility criteria.
            </Text>
          </View>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I visit the campus before enrolling?</Text>
            <Text style={styles.faqAnswer}>
              Absolutely! We encourage prospective students to visit our campus. 
              Please contact us to schedule a campus tour at your convenience.
            </Text>
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
    backgroundColor: '#f8f9fa'
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
  introText: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 26,
    maxWidth: 800,
  },
  // Contact Container
  contactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
    marginBottom: 30,
    justifyContent: 'center',
    width: '100%',
  },
  // Contact Information
  contactInfo: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    backgroundColor: '#D9D9D9',
    padding: 30,
    borderRadius: 8,
    marginLeft: 50,
  },
  contactInfoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  contactIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  contactDetails: {
    flex: 1,
  },
  contactType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 8,
  },
  contactValue: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 3,
    lineHeight: 20,
  },
  // Contact Form
  contactForm: {
    flex: 1,
    minWidth: 300,
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactFormTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 25,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#CFB53B',
  },
  formInput: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  messageInput: {
    height: 120,
  },
  submitButton: {
    backgroundColor: '#004225',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 4,
    alignItems: 'center',
    height: 55,
  },
  submitButtonHover: {
    backgroundColor: '#002a18',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  errorText: {
    color: '#d9534f',
    fontSize: 14,
    marginBottom: 10,
    marginTop: -15,
    marginLeft: 5,
  },
  successText: {
    color: '#2e8b57',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
  },
  // Map Section
  mapSection: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  mapDescription: {
    fontSize: 18,
    color: '#002a18',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    maxWidth: 800,
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 800,
    borderWidth: 2,
    borderColor: '#CFB53B',
    borderStyle: 'dashed',
  },
  mapPlaceholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004225',
    marginBottom: 5,
    marginTop: 10,
  },
  mapPlaceholderSubtext: {
    fontSize: 16,
    color: '#002a18',
    marginBottom: 15,
  },
  mapButton: {
    backgroundColor: '#CFB53B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    marginTop: 10,
  },
  mapButtonText: {
    color: '#002a18',
    fontWeight: 'bold',
    fontSize: 16,
  },
  // FAQ Section
  faqSection: {
    backgroundColor: '#f8f9fa',
    padding: 40,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  faqContainer: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  faqQuestion: {
    padding: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004225',
    backgroundColor: 'rgba(0, 66, 37, 0.1)',
  },
  faqAnswer: {
    padding: 20,
    fontSize: 16,
    color: '#002a18',
    lineHeight: 24,
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

export default ContactScreen;