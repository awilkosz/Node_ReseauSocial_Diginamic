const express = require('express');
const router = express.Router();

//Middlewares
const auth = require('./middlewares/auth');

//Controllers
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const MessageController = require('./controllers/MessageController');
const UserController = require('./controllers/UserController');
const AmiController = require('./controllers/AmiController');
const AimermessageController = require('./controllers/AimemessageController');

//Home
router.get('/', (req, res) => {
    res.json({hello: 'World!'});
})

//Deux routes: connexion et inscription
// /api/signin & /api/signup
router.post('/api/signin', AuthController.signIn);
router.post('/api/signup', AuthController.signUp);

//Routes des Utilisateurs
router.get('/api/search/:name', UserController.getUserByName);
router.get('/api/getUser/:id', UserController.getUserById);

//Routes des posts
router.get('/api/posts', auth, PostController.index);

//Routes des messages
router.get('/api/messages', MessageController.index);
router.get('/api/messages/:destiId', MessageController.getMessagesUser);
router.get('/api/filActu/:id', MessageController.getFilActualite);

router.post('/api/messages/nouveaumessage', MessageController.publierMessage);

router.patch('/api/messages/changePrivacy', MessageController.parametreConfidentialite);

//Routes des amis
router.get('/api/getDemandesAmi/:id', AmiController.getFriendRequests);
router.get('/api/getAmis/:id', AmiController.getFriends);
router.get('/api/getEtreAmis/:userId/:amiId', AmiController.estAmi);
router.get('/api/getEtreAmisDeux/:userId/:amiId', AmiController.estAmi2);

router.post('/api/demandeAmi', AmiController.demanderEnAmi);
router.post('/api/creerAmitie', AmiController.accepterInvitationPartDeux);

router.patch('/api/accepterInvitation', AmiController.accepterInvitation);

//router.delete('api/refuserInvitation/:idUser/:idAmi', AmiController.refuserInvitation);

//Routes aimeMessage
router.get('/api/getNombresLike/:messageId', AimermessageController.getNbLikes);
router.get('/api/estUnMessageAime/:userId/:messageId', AimermessageController.isLikedMessage);

router.post('/api/aimerUnMessage', AimermessageController.aimerMessage);

module.exports = router;