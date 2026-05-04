/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [studentId]
 * @property {'student' | 'admin'} role
 * @property {string} [department]
 * @property {string} [courseCode]
 * @property {string} [school]
 * @property {string} [level]
 */

/**
 * @typedef {'pending' | 'read' | 'in-progress' | 'resolved' | 'rejected'} ComplaintStatus
 */

/**
 * @typedef {'exam_mark' | 'ca_mark' | 'others'} ComplaintType
 */

/**
 * @typedef {Object} Complaint
 * @property {string} id
 * @property {string} studentId
 * @property {string} studentName
 * @property {string} studentEmail
 * @property {string} school
 * @property {string} department
 * @property {string} level
 * @property {string} academicYear
 * @property {string} courseCode
 * @property {string} courseName
 * @property {ComplaintType} complaintType
 * @property {string} description
 * @property {string} [attachmentFile]
 * @property {string} [attachmentFileName]
 * @property {string[]} [attachments]
 * @property {ComplaintStatus} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {string} [adminNotes]
 * @property {Date} [resolvedAt]
 * @property {string} [assignedTo]
 * @property {'low' | 'medium' | 'high'} [priority]
 */

/**
 * @typedef {Object} ComplaintFilter
 * @property {ComplaintStatus} [status]
 * @property {string} [studentId]
 * @property {string} [courseCode]
 * @property {string} [complaintType]
 * @property {Date} [dateFrom]
 * @property {Date} [dateTo]
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalComplaints
 * @property {number} pendingComplaints
 * @property {number} resolvedComplaints
 * @property {number} rejectedComplaints
 * @property {number} averageResolutionTime
 * @property {number} inProgressComplaints
 */

// Optional: Export constants for runtime use
export const ComplaintStatuses = ['pending', 'read', 'in-progress', 'resolved', 'rejected'];
export const ComplaintTypes = ['exam_mark', 'ca_mark', 'others'];
export const PriorityLevels = ['low', 'medium', 'high'];