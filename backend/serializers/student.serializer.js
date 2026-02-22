import { serializeUser } from "./user.serializer.js";

const serializeStudent = (studentDoc) => {
  if (!studentDoc) return null;

  const student = studentDoc.toObject ? studentDoc.toObject() : studentDoc;
  return {
    id: student._id,
    user: student.userId?.email ? serializeUser(student.userId) : student.userId,
    schoolName: student.schoolName,
    enrollmentNumber: student.enrollmentNumber,
    currentClass: student.currentClass,
    board: student.board,
    medium: student.medium,
  };
};

export { serializeStudent };
