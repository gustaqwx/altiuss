import { platformApi } from '../journey/api'
export const reviewsApi = {
  getQueue: () => platformApi.getReviewQueue(),
  save: (submissionId, review) => platformApi.saveReview(submissionId, review),
  startReview: (submissionId) => platformApi.startReview(submissionId),
  getMentorStudents: () => platformApi.getMentorStudents(),
  saveMentoringSession: (data) => platformApi.saveMentoringSession(data),
}
