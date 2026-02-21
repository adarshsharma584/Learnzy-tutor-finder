const serializeBatch = (batchDoc) => {
  if (!batchDoc) return null;

  const batch = batchDoc.toObject ? batchDoc.toObject() : batchDoc;
  return {
    id: batch._id,
    tuitionId: batch.tuitionId,
    name: batch.name,
    time: batch.time,
    students: batch.Students,
    teachersId: batch.teachersId,
    totalSeats: batch.totalSeats,
    bookedSeats: batch.bookedSeats,
    availableSeats: batch.availableSeats,
    subjects: batch.subjects,
    fee: batch.fee,
    createdAt: batch.createdAt,
    updatedAt: batch.updatedAt,
  };
};

export { serializeBatch };
