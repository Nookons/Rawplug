export const getStatusLabel = (status) => {
    switch (status) {
        case "success":
            return 'Used';
        case "processing":
            return 'Available';
        case "error":
            return 'Hold';
        default:
            return 'Unknown';
    }
};

export const next = ({current, setCurrent}) => {
    setCurrent(current + 1);
};

export const prev = ({current, setCurrent}) => {
    setCurrent(current - 1);
};