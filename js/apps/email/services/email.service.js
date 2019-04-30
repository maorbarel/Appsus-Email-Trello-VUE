import utilsServices from './utils.service.js';
import storageServices from './storage.service.js'

export default {
  getEmails,
  getEmailById,
  deleteEmailByIdx,
  newEmail,
  changeStatusEmailReadByIdx,
  changeStatus,
  chageStar,
  sortDate,
  sortFrom
}
const INBOX = 'inbox'

var gEmails = [
  { isInbox: true, id: utilsServices.makeId(), from: 'im1', subject: 'Wassap with Vue?', body: 'May I sdfsdf sdfasdf b sdfsdf ', isRead: false, sentAt: Date.now(), isStared: true },
  { isInbox: true, id: utilsServices.makeId(), from: 'im2', subject: 'Wassap with Vue?', body: 'May I', isRead: true, sentAt: Date.now(), isStared: false },
  { isInbox: true, id: utilsServices.makeId(), from: 'im3', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: Date.now(), isStared: false },
  { isInbox: true, id: utilsServices.makeId(), from: 'im4', subject: 'Wassap with Vue?', body: 'May I sdfsdf sdfasdf b sdfsdf ', isRead: false, sentAt: Date.now(), isStared: true },
  { isInbox: true, id: utilsServices.makeId(), from: 'im5', subject: 'Wassap with Vue?', body: 'May I', isRead: true, sentAt: Date.now(), isStared: false },
  { isInbox: true, id: utilsServices.makeId(), from: 'qmasdasasd6', subject: 'Wassap with Vue?', body: 'May I', isRead: false, sentAt: Date.now(), isStared: false },
  { isInbox: false, id: utilsServices.makeId(), from: 'im7', subject: 'Wassap with Vue?', body: 'May I', isRead: true, sentAt: Date.now(), isStared: false },
  { isInbox: false, id: utilsServices.makeId(), from: 'im8', subject: 'Wassap with Vue?', body: 'May I', isRead: true, sentAt: 100000, isStared: false }
]

function getEmails() {
  var emails = storageServices.load(INBOX)
  if (!emails) {
    storeToStorage();
    emails = storageServices.load(INBOX);
    return Promise.resolve(emails)
  } else return Promise.resolve(emails)
}

function sortDate() {
  var emails = storageServices.load(INBOX)
  emails.sort((a, b) => {
    if (a.sentAt < b.sentAt) { return -1; }
    if (a.sentAt > b.sentAt) { return 1; }
    return 0;
  })
  storageServices.store(INBOX, emails)
}
function sortFrom() {
  var emails = storageServices.load(INBOX)
  emails.sort((a, b) => {
    if (a.from > b.from) { return -1; }
    if (a.from < b.from) { return 1; }
    return 0;
  })
  storageServices.store(INBOX, emails)
}

function getEmailById(id) {
  var emails = storageServices.load(INBOX)
  var emailBack;
  emails.map(email => {
    if (email.id === id) emailBack = email
  })
  return Promise.resolve(emailBack)
}

function deleteEmailByIdx(idx) {
  var emails = storageServices.load(INBOX)
  emails.splice(idx, 1)
  storageServices.store(INBOX, emails)
}

function changeStatusEmailReadByIdx(id) {
  var emails = storageServices.load(INBOX)
  emails.map(email => {
    if (email.id === id) email.isRead = true
  })
  storageServices.store(INBOX, emails)
}

function changeStatus(id) {
  var emails = storageServices.load(INBOX)
  emails.map(email => {
    if (email.id === id) email.isRead = !email.isRead
  })
  storageServices.store(INBOX, emails)
}
function chageStar(id) {
  var emails = storageServices.load(INBOX)
  emails.map(email => {
    if (email.id === id) email.isStared = !email.isStared
  })
  storageServices.store(INBOX, emails)
}

function storeToStorage() {
  storageServices.store(INBOX, gEmails)
}

function newEmail(obj) {
  var newEmail = {
    isInbox: false,
    id: utilsServices.makeId(),
    from: obj.from,
    subject: obj.subject,
    body: obj.body,
    isRead: true,
    sentAt: Date.now(),
    isStared: false,
  }
  var emails = storageServices.load(INBOX)
  emails.push(newEmail)
  storageServices.store(INBOX, emails)
}