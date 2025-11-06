// courses.ts
import { SixMonthCourse, SixWeekCourse } from '../types/courses';

// Mock images - replace with actual image imports
const firstAidImage = require('../assets/images/first-aid-course.jpg');
const sewingImage = require('../assets/images/sewing-course.jpg');
const landscapingImage = require('../assets/images/landscaping-course.jpg');
const lifeSkillsImage = require('../assets/images/life-skills-course.jpg');
const childMindingImage = require('../assets/images/child-minding-course.jpg');
const cookingImage = require('../assets/images/cooking-course.jpg');
const gardenMaintenanceImage = require('../assets/images/garden-main-course.jpg');

export const sixMonthCourses: SixMonthCourse[] = [
  {
    id: 'first-aid',
    title: 'First Aid',
    description: 'Learn essential life-saving skills to manage emergencies and injuries effectively.',
    price: 1500,
    image: firstAidImage,
    overview: 'This comprehensive program covers a wide range of first aid techniques, ensuring that you are prepared to handle various medical situations with competence and care.',
    highlights: [
      {
        title: 'Introduction to First Aid',
        overview: 'Understanding the principles and importance of first aid.',
        items: [
          'Understanding the principles and importance of first aid.',
          'Legal and ethical considerations in providing assistance.',
          'Basic equipment and supplies.'
        ],
        project: '',
        audience: ''
      },
      {
        title: 'CPR and AED Training',
        overview: 'Cardiopulmonary resuscitation techniques for all ages.',
        items: [
          'Cardiopulmonary resuscitation (CPR) techniques for adults, children, and infants.',
          'Proper use of Automated External Defibrillators (AEDs).',
          'Recognizing and responding to cardiac emergencies.'
        ],
        project: '',
        audience: ''
      },
    ],
    benefits: [
      'Expert Instructors: Learn from certified professionals with extensive experience in emergency medical services.',
      'Hands-On Learning: Gain practical experience through interactive sessions and real-life simulations.',
      'Flexible Schedule: Options for evening and weekend classes to fit your busy lifestyle.',
      'Certification: Receive a nationally recognized certificate upon successful completion.'
    ],
    whoShouldEnroll: [
      'This program is ideal for individuals who want to enhance their ability to respond effectively in emergency situations, including parents, teachers, coaches, and anyone interested in acquiring life-saving skills.'
    ]
  },
  {
    id: 'sewing',
    title: 'Sewing',
    description: 'Master the art of sewing, from basic techniques to creating beautiful garments.',
    price: 1500,
    image: sewingImage,
    overview: 'Our comprehensive sewing program takes you from basic stitching to advanced garment construction, empowering you to create beautiful, professional-quality clothing and textiles.',
    highlights: [
      {
        title: 'Basic Sewing Techniques',
        overview: 'Foundation skills for all sewing projects.',
        items: [
          'Understanding different fabrics and their properties',
          'Basic hand stitches and machine operation',
          'Reading and understanding patterns'
        ],
        project: '',
        audience: ''
      },
      {
        title: 'Garment Construction',
        overview: 'Learn to create complete clothing items.',
        items: [
          'Taking accurate body measurements',
          'Cutting and assembling garments',
          'Finishing techniques and alterations'
        ],
        project: '',
        audience: ''
      },
    ],
    benefits: [
      'Expert Instruction: Learn from experienced fashion designers and tailors',
      'Professional Equipment: Access to industrial sewing machines and tools',
      'Portfolio Development: Create multiple finished projects for your portfolio',
      'Business Skills: Learn how to start your own sewing business'
    ],
    whoShouldEnroll: [
      'Aspiring fashion designers, tailors, hobbyists, and anyone interested in creating their own clothing or starting a sewing business.'
    ]
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    description: 'Gain skills to design and maintain beautiful outdoor spaces with a focus on sustainability.',
    price: 1500,
    image: landscapingImage,
    overview: 'Transform outdoor spaces into beautiful, functional, and sustainable environments with our comprehensive landscaping program that combines design principles with practical horticultural skills.',
    highlights: [
      {
        title: 'Landscape Design Principles',
        overview: 'Fundamentals of creating beautiful outdoor spaces.',
        items: [
          'Understanding space, form, and function in landscape design',
          'Creating design plans and blueprints',
          'Selecting appropriate plants for different environments'
        ],
        project: '',
        audience: ''
      },
      {
        title: 'Sustainable Landscaping',
        overview: 'Environmentally friendly landscaping practices.',
        items: [
          'Water conservation and irrigation systems',
          'Native plant selection and ecosystem preservation',
          'Organic gardening and natural pest control'
        ],
        project: '',
        audience: ''
      },
    ],
    benefits: [
      'Hands-On Projects: Work on real landscaping projects throughout the course',
      'Industry Connections: Network with landscaping professionals and companies',
      'Business Training: Learn how to start and manage a landscaping business',
      'Certification: Receive recognized credentials in sustainable landscaping'
    ],
    whoShouldEnroll: [
      'Aspiring landscapers, gardeners, property managers, and anyone passionate about creating beautiful and sustainable outdoor environments.'
    ]
  },
  {
    id: 'life-skills',
    title: 'Life Skills',
    description: 'Develop essential life skills to enhance your personal and professional development.',
    price: 1500,
    image: lifeSkillsImage,
    overview: 'Build a strong foundation for personal and professional success with our comprehensive life skills program that covers essential areas for modern living and career advancement.',
    highlights: [
      {
        title: 'Financial Literacy',
        overview: 'Managing personal finances effectively.',
        items: [
          'Budgeting and expense tracking',
          'Understanding credit and debt management',
          'Basic investment principles and savings strategies'
        ],
        project: '',
        audience: ''
      },
      {
        title: 'Communication Skills',
        overview: 'Effective interpersonal and professional communication.',
        items: [
          'Verbal and non-verbal communication techniques',
          'Conflict resolution and negotiation skills',
          'Professional email and business writing'
        ],
        project: '',
        audience: ''
      },
    ],
    benefits: [
      'Practical Application: Real-world scenarios and role-playing exercises',
      'Personalized Coaching: One-on-one sessions with life skills coaches',
      'Career Development: Resume building and interview preparation',
      'Community Building: Connect with peers on similar personal growth journeys'
    ],
    whoShouldEnroll: [
      'Young adults entering the workforce, career changers, and anyone looking to enhance their personal effectiveness and professional capabilities.'
    ]
  }
];

export const sixWeekCourses: SixWeekCourse[] = [
  {
    id: 'child-minding',
    title: 'Child Minding',
    description: 'Gain expertise in early childhood development and create safe environments for children.',
    price: 750,
    image: childMindingImage,
    overview: 'Our Child-Minding Training Program is designed to provide caregivers, parents, and professionals with the skills and knowledge needed to ensure the well-being, safety, and development of children.',
    highlights: [
      {
        title: 'Introduction to Child-Minding: Roles and Responsibilities',
        overview: 'This foundational class introduces the core responsibilities and best practices of child-minding.',
        items: [
          'Overview of the child-minding role: duties and expectations.',
          'Understanding child development stages and their impact on care.',
          'Creating a safe and nurturing environment for children.',
          'Effective communication with children and parents.'
        ],
        project: 'Develop a basic child-minding plan that includes daily routines, activities, and safety measures.',
        audience: 'New caregivers, parents, and individuals interested in learning the fundamentals of child-minding.'
      },
    ],
    benefits: [
      'Expert Instructors: Learn from experienced child care professionals with extensive knowledge in child development and safety.',
      'Hands-On Learning: Engage in practical exercises and real-life scenarios to reinforce learning.',
      'Personalized Guidance: Receive feedback and support tailored to your specific child-minding needs.',
      'Flexible Scheduling: Classes available at various times to accommodate different schedules.'
    ],
    whoShouldEnroll: [
      'Our program is suitable for parents, caregivers, child care professionals, and anyone interested in enhancing their skills in child-minding.'
    ]
  },
  {
  id: 'cooking',
  title: 'Cooking & Nutrition',
  description: 'Master the art of preparing nutritious, balanced meals for modern households.',
  price: 750,
  image: cookingImage,
  overview: 'Our Cooking & Nutrition Training Program is designed to provide caregivers, household cooks, and food enthusiasts with the skills and knowledge needed to prepare healthy, delicious meals for families and individuals.',
  highlights: [
    {
      title: 'Introduction to Cooking & Nutrition: Kitchen Fundamentals',
      overview: 'This foundational class introduces essential cooking techniques and nutritional principles.',
      items: [
        'Overview of basic cooking methods and kitchen safety.',
        'Understanding nutritional requirements for different age groups.',
        'Meal planning and preparation for balanced diets.',
        'Food storage, hygiene, and kitchen organization.'
      ],
      project: 'Develop a weekly meal plan that includes balanced nutrition and considers dietary preferences.',
      audience: 'Beginner cooks, domestic workers, and individuals interested in learning cooking fundamentals.'
    },
  ],
  benefits: [
    'Expert Instructors: Learn from experienced chefs and nutritionists with extensive knowledge in food preparation and dietary planning.',
    'Hands-On Learning: Engage in practical cooking sessions and recipe development to reinforce learning.',
    'Personalized Guidance: Receive feedback and support tailored to your specific cooking needs and dietary requirements.',
    'Flexible Scheduling: Classes available at various times to accommodate different schedules.'
  ],
  whoShouldEnroll: [
    'Our program is suitable for domestic workers, household cooks, parents, and anyone interested in enhancing their cooking skills and nutritional knowledge.'
  ],
  
},
{
  id: 'garden-maintenance',
  title: 'Garden Maintenance',
  description: 'Learn essential gardening skills to create and maintain beautiful outdoor spaces.',
  price: 750,
  image: gardenMaintenanceImage,
  overview: 'Our Garden Maintenance Training Program is designed to provide gardeners, property caretakers, and outdoor enthusiasts with the skills and knowledge needed to create and maintain beautiful, healthy outdoor environments.',
  highlights: [
    {
      title: 'Introduction to Garden Maintenance: Basic Gardening Principles',
      overview: 'This foundational class introduces essential gardening techniques and plant care principles.',
      items: [
        'Overview of garden maintenance tasks and seasonal requirements.',
        'Understanding plant growth and soil management basics.',
        'Proper use and maintenance of gardening tools and equipment.',
        'Watering systems and sustainable gardening practices.'
      ],
      project: 'Develop a basic garden maintenance plan that includes seasonal tasks and plant care schedules.',
      audience: 'Beginner gardeners, property caretakers, and individuals interested in learning garden maintenance fundamentals.'
    },
  ],
  benefits: [
    'Expert Instructors: Learn from experienced horticulturists and garden professionals with extensive knowledge in plant care and landscape maintenance.',
    'Hands-On Learning: Engage in practical gardening sessions and real-life maintenance scenarios to reinforce learning.',
    'Personalized Guidance: Receive feedback and support tailored to your specific gardening needs and environmental conditions.',
    'Flexible Scheduling: Classes available at various times to accommodate different schedules.'
  ],
  whoShouldEnroll: [
    'Our program is suitable for gardeners, domestic workers, property managers, and anyone interested in enhancing their skills in garden maintenance and plant care.'
  ],

}
];