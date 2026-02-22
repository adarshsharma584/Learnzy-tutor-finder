import { serializeUser } from "./user.serializer.js";

const serializeTeacher = (teacherDoc) => {
  if (!teacherDoc) return null;

  const teacher = teacherDoc.toObject ? teacherDoc.toObject() : teacherDoc;
  return {
    id: teacher._id,
    user: teacher.userId?.email ? serializeUser(teacher.userId) : teacher.userId,
    subjects: teacher.subjects,
    experience: teacher.experience,
    currentStatus: teacher.currentStatus,
    qualifications: teacher.qualifications || [],
    isQualified: teacher.isQualified,
    isTestVerified: teacher.isTestVerified,
    testScore: teacher.testScore,
    // createdAt: teacher.createdAt,
    // updatedAt: teacher.updatedAt,
  };
};

export { serializeTeacher };
