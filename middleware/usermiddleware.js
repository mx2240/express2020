

const AccounntChecker = (req, res, next) => {
    if (1 == 1) {
        console.log('user is logged in');
        res.send('Welcome user logged in');
        next();

    } else {

        console.log('user is not logged in');
        res.send(' user not logged in');
    }
}










module.exports = AccounntChecker