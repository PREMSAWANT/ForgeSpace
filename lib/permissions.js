/**
 * Permission utility functions for role-based access control
 */

/**
 * Check if user can edit workspace
 * @param {Object} workspace - Workspace object
 * @param {String} userId - User ID to check
 * @returns {Boolean}
 */
export function canEditWorkspace(workspace, userId) {
  if (!workspace || !userId) return false;
  
  // Owner can always edit
  if (workspace.ownerId.toString() === userId.toString()) {
    return true;
  }
  
  // Check if user is admin
  const member = workspace.members?.find(
    m => m.userId.toString() === userId.toString()
  );
  
  return member?.role === 'admin';
}

/**
 * Check if user can edit project
 * @param {Object} workspace - Workspace object
 * @param {String} userId - User ID to check
 * @returns {Boolean}
 */
export function canEditProject(workspace, userId) {
  if (!workspace || !userId) return false;
  
  // Owner and admins can edit
  if (workspace.ownerId.toString() === userId.toString()) {
    return true;
  }
  
  // Members and admins can edit projects
  const member = workspace.members?.find(
    m => m.userId.toString() === userId.toString()
  );
  
  return member && ['admin', 'member'].includes(member.role);
}

/**
 * Check if user can invite members
 * @param {Object} workspace - Workspace object
 * @param {String} userId - User ID to check
 * @returns {Boolean}
 */
export function canInviteMembers(workspace, userId) {
  if (!workspace || !userId) return false;
  
  // Only owner and admins can invite
  if (workspace.ownerId.toString() === userId.toString()) {
    return true;
  }
  
  const member = workspace.members?.find(
    m => m.userId.toString() === userId.toString()
  );
  
  return member?.role === 'admin';
}

/**
 * Check if user can delete workspace
 * @param {Object} workspace - Workspace object
 * @param {String} userId - User ID to check
 * @returns {Boolean}
 */
export function canDeleteWorkspace(workspace, userId) {
  if (!workspace || !userId) return false;
  
  // Only owner can delete
  return workspace.ownerId.toString() === userId.toString();
}

/**
 * Get user's role in workspace
 * @param {Object} workspace - Workspace object
 * @param {String} userId - User ID to check
 * @returns {String|null} - Role or null if not a member
 */
export function getUserRole(workspace, userId) {
  if (!workspace || !userId) return null;
  
  if (workspace.ownerId.toString() === userId.toString()) {
    return 'owner';
  }
  
  const member = workspace.members?.find(
    m => m.userId.toString() === userId.toString()
  );
  
  return member?.role || null;
}
