const priceRegExp = /^\d+$/;

export const validationExam = (course: {
  title: string;
  totalmark: string;
  subject: string;
 
}) => {
  const errorMessage: {
    title: string;
    totalmark: string;
    subject: string;
    
  } = {
    title: "",
    totalmark: "",
    subject: "",
    
  };
  if (
    course.title.length == 0 ||
    course.title.length < 3 ||
    course.title.length > 50
  ) {
    errorMessage.title = "course title must be between 5 and 25   char";
  } else if (!priceRegExp.test(course.totalmark)) {
    errorMessage.totalmark = "Course price must contain only numbers";
  }  else if (
    
    course.subject.length == 0 ||
    course.subject.length < 3 ||
    course.subject.length > 30
  ) {
    errorMessage.subject = "course subject must be between 3 and 25   char";
  } 
  return errorMessage;
};

