import express from 'express';

import { 
    createDiscussion, 
    getDiscussions, 
    getDiscussionById, 
    updateDiscussion, 
    deleteDiscussion 
} from '../controllers/discussion.controller.js';

import { 
    createReply, 
    getReplies, 
    getReplyById, 
    updateReply, 
    deleteReply 
} from '../controllers/discussionReply.controller.js';

const router = express.Router();

// Discussion routes
router.post('/discussions', createDiscussion);
router.get('/discussions', getDiscussions);
router.get('/discussions/:id', getDiscussionById);
router.put('/discussions/:id', updateDiscussion);
router.delete('/discussions/:id', deleteDiscussion);

// DiscussionReply routes
router.post('/replies', createReply);
router.get('/replies', getReplies);
router.get('/replies/:id', getReplyById);
router.put('/replies/:id', updateReply);
router.delete('/replies/:id', deleteReply);

export default router;