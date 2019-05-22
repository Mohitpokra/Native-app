export const vendorStatus = {
    A: 'active',
    D: 'disable',
    N: 'unknown',
    H: 'hidden'
}

export const fullStatus = function giveStatus(status) {
    status = status.toUpperCase();
    switch (status) {
        case 'A':
            return 'active';
        case 'D':
            return 'disable';
        case 'N':
            return 'unknown';
        case 'H':
            return 'hidden';
    }
}