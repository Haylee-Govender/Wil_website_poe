# Wil_website_poe
# Empowering the nation 
- E-TECH TITIANS
- KYTHERA
- HAYLEE
- JADENE
- YASHNA
---

# Overview of the WIL POE
Empowering the Nation is a small-to-medium enterprise (SME) founded by Precious Radebe in 2022. The organisation provides skills training for domestic workers and gardeners in Johannesburg, South Africa. The goal of this digital project is to design and develop a responsive website and mobile application that helps the business reach a wider audience, advertise training programmes, and allow potential customers to request quotes or information directly online.

- We were given a scenario and needed to give a solution to it, and that was making a Website and App for Empowering the nation
- We had to code in typescript react natie and develop these 2 projects

# Project Purpose
## The website and mobile app aim to:
- Advertise training courses offered by Empowering the Nation.
- Allow customers (employers or employees) to select and request quotes for one or more courses.
- Provide an automated discount system based on the number of courses selected.
- Maintain a professional design that reflects the company’s mission and values.
- Had to have a calculator that calculates the discounds, vat and total amount at the end
- Need to have a discription of each course and whats to be expected

## Key Features

*   **Course Catalogue**: Browse detailed descriptions of all available courses, including what to expect from each program.
*   **Course Selection & Fee Calculator**: Users can select one or more courses and see the total cost calculated in real-time.
*   **Automated Discounts**: A discount system is automatically applied based on the number of courses selected:
    *   **5%** discount for 2 courses.
    *   **10%** discount for 3 courses.
    *   **15%** discount for 4 or more courses.
*   **VAT Calculation**: All fees include a 15% VAT, which is calculated on the discounted subtotal.
*   **User Authentication**: Secure sign-up and login functionality for a personalized experience.
*   **Quote & Enrollment Request**: After calculating the fees, users can submit their information to receive a formal quote or begin the enrollment process.
*   **Invoice Generation**: A simple invoice is displayed upon enrollment request, providing a summary and a unique reference number.
*   **Contact Form**: A dedicated contact page with a form for inquiries and detailed contact information.
*   **Responsive Design**: The UI is designed to be accessible and user-friendly across both web and mobile platforms.


## Discount Structure
Number of Courses	Discount
One course	0%
Two courses	5%
Three courses	10%
More than three	15%

## Courses Offered
### Six-Month Learnerships (R1500 each)

*   **First Aid**: Comprehensive training in basic life support, CPR, and emergency care.
*   **Sewing**: Learn garment tailoring, stitching, and alteration techniques.
*   **Landscaping**: Master the art of designing and maintaining beautiful, sustainable gardens.
*   **Life Skills**: Develop essential skills in literacy, basic finance, and personal management.

### Six-Week Short Courses (R750 each)

*   **Child Minding**: Covers the fundamentals of infant and toddler care, safety, and development.
*   **Cooking & Nutrition**: Learn to prepare nutritious and delicious family meals.
*   **Garden Maintenance**: Focuses on practical skills like pruning, watering, and plant propagation.

## System Features
- Homepage: Displays business overview and available courses.
- Course Selection Page: Allows customers to choose multiple courses.
- Quote Calculator: Automatically applies discounts.
- Contact Form: Enables potential customers to request information or a quote.
- Responsive Design: Ensures accessibility across web and mobile platforms.
- Invoice: A form that tell the user they be given a quote or message to pay

## Technology Stack
*   **Framework**: React Native
*   **Language**: TypeScript
*   **Navigation**: React Navigation (`@react-navigation/stack`)
*   **Icons**: React Native Vector Icons (`react-native-vector-icons/FontAwesome`)
*   **Platform**: Configured for cross-platform deployment (iOS/Android)

---

## detail of each screen 
###  App.tsx: 
- The root component of the application. It initializes the StackNavigator from React Navigation, defining all possible routes and linking them to their respective screen components. It also configures the global header style for the app.

###  HomeScreen.tsx:
-The main landing page and dashboard. It displays a welcome message to logged-in users or an "Account" dropdown for guests. The screen features an overview of the organization, key statistics, popular courses, and multiple calls-to-action to encourage user engagement.

### SignUpScreen.tsx: 
- A form for new users to create an account. It captures the user's full name, email, and password, performs validation, and provides feedback on success or failure. +* LoginScreen.tsx: A form for existing users to sign in. It authenticates users based on email and password and, upon success, navigates them to the home screen with a personalized state.

###   AboutScreen.tsx: 
- Provides a comprehensive overview of the "Empowering the Nation" organization. It details the founder's story, the company's mission, and showcases its impact through statistics and key values.
  
###  ContactScreen.tsx: 
- A multi-functional contact page. It includes a form for sending inquiries, detailed contact information (address, phone, email), office hours, an interactive map link, and a Frequently Asked Questions (FAQ) section to address common queries.
  
### CourseOptionsScreen.tsx: 
- Acts as a simple navigation hub for the course catalogue. It presents users with two clear choices: exploring the 6-Week Short Courses or the 6-Month Learnerships.
  
### SixMonthCoursesScreen.tsx / SixWeekCoursesScreen.tsx: 
- These screens serve as catalogues, displaying all available courses within their respective categories. Each course is presented in a detailed card format with an image, description, price, and a button to view more information. ### +* FirstAidCourseScreen.tsx (and other individual course screens): Each course has its own dedicated detail page.
- These screens provide an in-depth program overview, curriculum highlights, benefits, target audience, and a direct call-to-action to enroll.
  
###  CourseSelectionScreen.tsx: 
- A crucial interactive screen where users can select one or more courses to generate a quote. It includes fields for personal information, a complete list of selectable courses, and a button to trigger the fee calculation.
  
###  FeeCalculationResultsScreen.tsx:
- Displays a detailed breakdown of the costs after a user submits their course selection. It clearly lists the subtotal, any applicable discounts, VAT, and the final total. This screen also contains the "Enroll Now" button, which generates a modal invoice.
  
###  BottomNavBar.tsx: 
- A persistent navigation component that appears at the bottom of most screens. It provides quick and easy access to the main sections of the app: Home, Courses, About, and Contact. 

---


---




---


# Referencing 
/*reference links to the pictures guys. Pinterest, 2025. Pin: 320881542220542951. [online] Available at: <https://za.pinterest.com/pin/320881542220542951/> [Accessed 1November 2025]
- Pinterest, 2025. Pin: 250794272993798934. [online] Available at: <https://za.pinterest.com/pin/250794272993798934/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 684687949635079876. [online] Available at: <https://za.pinterest.com/pin/684687949635079876/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 211174977846586. [online] Available at: <https://za.pinterest.com/pin/211174977846586/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 70650287899922509. [online] Available at: <https://za.pinterest.com/pin/70650287899922509/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 711991022380831995. [online] Available at: <https://za.pinterest.com/pin/711991022380831995/> [Accessed 1 November 2025
- Pinterest, 2025. Pin: 1125968725265654. [online] Available at: <https://za.pinterest.com/pin/1125968725265654/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 211174978692598. [online] Available at: <https://za.pinterest.com/pin/211174978692598/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 89157267629136148. [online] Available at: <https://za.pinterest.com/pin/89157267629136148/> [Accessed 1 November 2025]
- Pinterest, 2025. Pin: 4596627232152979456. [online] Available at: <https://za.pinterest.com/pin/4596627232152979456/> [Accessed 1 November 2025]*/

/*
 * SixMonthCourses Screen References:
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
 * Image References Used in SixMonthCourses Screen:
 * Shuttershock.com, 22 April 2022. Sewing images. [electronic print]. 
 * Available at: <Arabian Man Designer Sewing Clothes On Stock Photo 1891968490 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Sewing course image)
 * 
 * Shuttershock.com, 30 June 2022. Landscaping images. [electronic print]. 
 * Available at: <Landscape Butchart Garden Spring Victoria British Stock Photo 76659253 | Shutterstock> [Accessed 08 August 2025].
 * (Used for: Landscaping course image)
 * 
 * Life Skills Creations Teaching Resources, 2021. Life Skills images. [electronic print]. 
 * Available at: <LIFE SKILLS> [Accessed 08 August 2025].
 * (Used for: Life Skills course image)
 * 
 * Physical sports aid, 2023. First Aid images. [electronic print]. 
 * Available at: <Sports Physio Kit | Physical Sports First Aid> [Accessed 08 August 2025].
 * (Used for: First Aid course image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Component References:
 * Course data structure and navigation patterns adapted from:
 * React Native Team, 2025. React Native Components and APIs. [online]
 * Available at: https://reactnative.dev/docs/components-and-apis [Accessed 04 November 2025].
 */

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

 /*
 * AboutScreen References:
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
 * Image References Used in AboutScreen:
 * Leadership, 2022. Education images. [electronic print]. 
 * Available at: <Increasing Education Budget Inline With SDG Goals> [Accessed 08 August 2025].
 * (Used for: Mission and Vision section background image)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Content References:
 * Organization story and mission statement based on educational empowerment principles from:
 * UNESCO, 2023. Education for Sustainable Development. [online]
 * Available at: https://www.unesco.org/en/education/sustainable-development [Accessed 04 November 2025].
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * ScrollView Component:
 * React Native Team, 2025. ScrollView Documentation. [online]
 * Available at: https://reactnative.dev/docs/scrollview [Accessed 04 November 2025].
 */

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

 /*
 * FirstAidCourse Screen References:
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
 * Image References Used in FirstAidCourse Screen:
 * Physical sports aid, 2023. First Aid images. [electronic print]. 
 * Available at: <Sports Physio Kit | Physical Sports First Aid> [Accessed 08 August 2025].
 * (Used for: Course header image and demonstration images)
 * 
 * Icons:
 * FontAwesome Icons from react-native-vector-icons library
 * Available at: https://github.com/oblador/react-native-vector-icons [Accessed 04 November 2025].
 * 
 * Course Content References:
 * First aid training curriculum based on:
 * South African Red Cross Society, 2023. First Aid Training Standards. [online]
 * Available at: https://www.redcross.org.za/ [Accessed 04 November 2025].
 * 
 * Department of Labour, 2023. Occupational Health and Safety Act First Aid Requirements. [online]
 * Available at: https://www.labour.gov.za/ [Accessed 04 November 2025].
 * 
 * St John Ambulance, 2023. First Aid Training Guidelines. [online]
 * Available at: https://www.stjohn.org.za/ [Accessed 04 November 2025].
 * 
 * Component References:
 * React Native Team, 2025. ScrollView Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/scrollview [Accessed 04 November 2025].
 * 
 * React Native Team, 2025. Modal Component Documentation. [online]
 * Available at: https://reactnative.dev/docs/modal [Accessed 04 November 2025].
 * (Used for: Enrollment confirmation dialogs)
 * 
 * Layout and Styling:
 * React Native Team, 2025. Style and Layout in React Native. [online]
 * Available at: https://reactnative.dev/docs/style [Accessed 04 November 2025].
 * 
 * Course Duration and Pricing:
 * Based on South African SETA-accredited training program standards from:
 * Health and Welfare SETA, 2023. First Aid Training Pricing Guidelines. [online]
 * Available at: https://www.hwseta.org.za/ [Accessed 04 November 2025].
 */
