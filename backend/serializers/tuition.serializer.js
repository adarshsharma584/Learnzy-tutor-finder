const serializeTuitionCenter = (tuitionCenterDoc) => {
  if (!tuitionCenterDoc) return null;

  const tuitionCenter = tuitionCenterDoc.toObject ? tuitionCenterDoc.toObject() : tuitionCenterDoc;

  return {
    id: tuitionCenter._id,
    name: tuitionCenter.name,
    owner: tuitionCenter.owner,
    address: tuitionCenter.address,
    teachers: tuitionCenter.teachers,
    ratings: tuitionCenter.ratings,
    subjects: tuitionCenter.subjects,
    boards: tuitionCenter.boards,
    medium: tuitionCenter.medium,
    mode: tuitionCenter.mode,
    batches: tuitionCenter.batches,
    photos: tuitionCenter.photos,
    totalStudents: tuitionCenter.totalStudents,
    createdAt: tuitionCenter.createdAt,
    updatedAt: tuitionCenter.updatedAt,
  };
};

export { serializeTuitionCenter };
