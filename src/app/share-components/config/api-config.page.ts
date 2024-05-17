// const domain = 'http://localhost:3000/';
// const domain = 'http://18.216.166.94:3000/';
// const domain = 'http://18.222.194.65:3000/';
const domain = 'http://3.14.84.150:3000/';

export let otp= domain+'api/login_by_otp';
export let login = domain+'api/login/password';
export let otpVerify = domain+'api/verify_otp';
export let subjectDetail= domain+'api/subject_class';
export let subjectCheckboxData= domain+'api/subject_checkbox';
// notification
export let notification = domain+'api/notification';
export let notificationSeen = domain+'api/notification/seen';

export let studentProfile = domain+'api/student_objectid';
export let contactUs = domain+'api/contact_us';
export let profileApi = domain+'api/student_objectid';

// export let qizliatApi = domain+'api/quiz/question';
export let personalDetail = domain+'api/student_update';
export let updateProfile = domain+'api/student_update';
// without Photo Apdate Api http://localhost:3000/api/student_update_data
export let updateProfileWithotimg = domain+'api/student_update_data';
export let studentSubject = domain+'api/student_subject';

// export let questionSet= domain+'api/subject/question'; change api
export let questionSet= domain+'api/questionset/list';
// export let studentSubject = domain+'api/student_subject'
export let newApi= domain+'api/news';
// Bannner Api
export let banner= domain+'api/banner';

// PaymentHistory
export let payment= domain+'api/payment/history';

// qiz Question  http://localhost:3000/api/quiz/score/637b4780c9f8ffa96005865e
export let quizQuestionList = domain+'api/quiz/question/list';
// export let examSubmit = domain+'api/quiz/data';
export let examSubmit = domain+'api/quizresult/add';

export let scroreCard = domain+'api/quiz/score';
// Vido topics data
export let vdoTopics = domain+'api/topic';

// Chat  http://localhost:3000/api/chat/list/637b4780c9f8ffa96005865d
export let chatlist = domain+'api/chat/list';
export let sentChat = domain+'api/chat/student';

// watchlatestTopic in Vdo
export let vdoUrl = domain+'api/watchlatest/list';

// Subjectt on Dashboard and cource banner in Vdo http://localhost:3000/api/student/subjects/63942dcfabaaae896dee66f5   
export let subject = domain+'api/student/subjects';
// data of accordin Shoen on cources page/tabs
export let couseAccordian = domain+'api/chapter/topic';

// imget='http://localhost:3000/api/student/details';
export let getprofile = domain+'api/student/details';

// live class listing ';
export let liveClass = domain+'api/meeting/list';

// Live class agora
export let agoraMeetingList = domain+'api/agora/list';

// Sample Paper 
export let samplePaper = domain+'api/samplepaper';

// classlst Paper 
export let classlst = domain+'api/signin/classlist';

// Session
export let session = domain+'api/signin/sessionlist';

// Batch Time 
export let batchTime = domain+'api/signin/batchlist';

// signup Time 
export let signup = domain+'api/student/signin';

// Mobile Number check 
export let checkNumber = domain+'api/number/verify';

// Token Check
export let checkToken = domain+'api/token/get';
// Session Out
export let sessionCheck = domain+'api/session/get';
// cource fee
export let courceFee = domain+'api/fees/list';

// cource fee
export let unicCodeVerification = domain+'api/login/user';

// New User Login
export let newUserMobileNumber = domain+'api/number/save';
export let MobileVerification = domain+'api/otp/verify';
export let recommendationCourceSmall = domain+'api/poster/small';
export let recommendationCourceBig = domain+'api/poster/big';
export let freeVideo = domain+'api/video/list';

// Buy Courses
export let addPrimumCourse = domain+'api/buy/add';
export let primumCourseList = domain+'api/buy/list';
export let primumCourseChapter = domain+'api/free/chapter/topic';

//create
export let createRazorOrderId = domain+'api/razorpay';


export let getDetailFreeUser = domain+'api/student/data';
export let patchDetailFreeUser = domain+'api/student/update';

export let attendanceGet = domain+'api/student/attend';


// create signature for zoom meeting
export let zoomCreateSignature = domain+'api/zoommeeting/sdk';




