export const createCategory = (name) => ({
    id: Date.now(),
    name,
    services: []
  });
  
  export const createService = (name, description) => ({
    id: Date.now(),
    name,
  });
  
  export const addServiceToCategory = (categories, categoryId, service) => {
    return categories.map(category =>
      category.id === categoryId
        ? { ...category, services: [...category.services, service] }
        : category
    );
  };
  
  export const deleteCategory = (categories, categoryId) => {
    return categories.filter(category => category.id !== categoryId);
  };
  
  export const deleteService = (categories, categoryId, serviceId) => {
    return categories.map(category =>
      category.id === categoryId
        ? { ...category, services: category.services.filter(service => service.id !== serviceId) }
        : category
    );
  };