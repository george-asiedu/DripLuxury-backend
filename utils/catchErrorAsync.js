const catchErrorAsync = fn => {
    const errhandler = (req, res, next) => {
        fn(req, res, next)
    }
    return errhandler
}

module.exports = catchErrorAsync