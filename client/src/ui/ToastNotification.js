function ToastNotification({ message, type }) {
    return (
        <div className={`fixed top-4 right-4 bg-${type === 'error' ? 'red' : 'green'}-600 text-white rounded-md p-4 shadow-md`}>
            {message}
        </div>
    );
}

export default ToastNotification;
