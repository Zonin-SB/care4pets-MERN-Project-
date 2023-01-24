import * as Yup from 'yup';

//password validation
const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const numberonly = /^\d+$/;
const link =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

export const userSignupSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be atleast 2 characters')
    .max(15)
    .required('This field is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number must be a 10 digit number')
    .min(10, 'Phone number must be a 10 digit number')
    .max(10, 'Phone number must be a 10 digit number')
    .required('This field is required'),
  pet: Yup.string().required('This field is required'),
  password: Yup.string()
    .min(5)
    .max(16)
    .matches(
      passwordRule,
      'Please enter a stronger password(Try adding symbols *#$)'
    )
    .required('This field is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must be same')
    .required('This field is required'),
});

export const expertSignupSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be atleast 2 characters')
    .max(15)
    .required('This field is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number must be a 10 digit number')
    .min(10, 'Phone number must be a 10 digit number')
    .max(10, 'Phone number must be a 10 digit number')
    .required('This field is required'),
  dob: Yup.date().required('This field is required'),
  gender: Yup.string().required('This field is required'),
  expertisedIn: Yup.string().required('This field is required'),
  experience: Yup.string()
    .matches(numberonly, 'Please enter valid experience')
    .required('This field is required'),
  password: Yup.string()
    .min(5)
    .max(16)
    .matches(
      passwordRule,
      'Please enter a stronger password(Try adding symbols *#$)'
    )
    .required('This field is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must be same')
    .required('This field is required'),
});

export const expertLoginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export const userLoginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export const adminLoginSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  password: Yup.string().required('This field is required'),
});

export const expertApplyFormSchema = Yup.object({
  profilepic: Yup.mixed().required('Required'),
  // idproof:Yup.mixed().required('Required'),
  // licensepic:Yup.mixed().required('Required')
});

export const userEditProfileSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be atleast 2 characters')
    .max(15)
    .required('This field is required'),
  email: Yup.string()
    .email('Enter a valid email')
    .required('This field is required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number must be a 10 digit number')
    .min(10, 'Phone number must be a 10 digit number')
    .max(10, 'Phone number must be a 10 digit number')
    .required('This field is required'),
  pet: Yup.string().required('This field is required'),
});

export const addPlanSchema = Yup.object({
  planName: Yup.string()
    .min(2, 'Enter a valid plan name.')
    .max(20)
    .required('Required'),
  validity: Yup.number().positive().integer().required('Required'),
  currentPrice: Yup.number().positive().integer().required('Required'),
  previousPrice: Yup.number().positive().integer().required('Required'),
  dietPlan: Yup.number().positive().integer().required('Required'),
  expertAvailability: Yup.number().positive().integer().required('Required'),
  numberOfCheckup: Yup.number().positive().integer().required('Required'),
  tipAvailabilty: Yup.string().required('Required'),
});

export const rejectionMessageSchema = Yup.object({
  name: Yup.string().min(2, 'Enter a valid name.').max(20).required('Required'),
  reason: Yup.string().required('This field is required'),
  message: Yup.string().required('This field is required'),
});

export const acceptMessageSchema = Yup.object({
  name: Yup.string().min(2, 'Enter a valid name.').max(20).required('Required'),

  message: Yup.string().required('This field is required'),
});

export const videoUploadSchema = Yup.object({
  title: Yup.string().required('This field is required'),
  type: Yup.string().required('This field is required'),
  link: Yup.string().matches(link, 'Please paste a valid youtube link').required('This field is required'),
  description: Yup.string().min(4).max(200).required('This field is required'),
  category:Yup.string().required('This field is required'),

});

export const rejectionVideoSchema = Yup.object({
  name: Yup.string().min(2, 'Enter a valid name.').max(20).required('Required'),
  title:Yup.string().required('This field is required'),
  reason: Yup.string().required('This field is required'),
  message: Yup.string().required('This field is required'),
});
