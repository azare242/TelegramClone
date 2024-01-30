export function objectToForm<T extends object>(data: T): FormData {
    const formData = new FormData();

    // Iterate over the object entries
    Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
            // Directly append File objects
            formData.append(key, value);
        } else {
            // Convert other types (string, number) to string before appending
            formData.append(key, String(value));
        }
    });

    return formData;
}
