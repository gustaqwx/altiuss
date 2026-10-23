import { platformApi } from '../journey/api'
export const activitiesApi = {
  getJourney: () => platformApi.getJourney(),
  submitActivity: (id, payload) => platformApi.submitActivity(id, payload),
  getNotifications: () => platformApi.getNotifications(),
}
