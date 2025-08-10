import initialBCardForm from "../initialForms/initialBCardForm";

const createInitialFormFromCard = (card) => {
    if (!card) return initialBCardForm;

    return {
        ...initialBCardForm,
        title: card.title || "",
        subtitle: card.subtitle || "",
        description: card.description || "",
        phone: card.phone || "",
        email: card.email || "",
        web: card.web || "",
        url: card.image?.url || "",
        alt: card.image?.alt || "",
        state: card.address?.state || "",
        country: card.address?.country || "",
        city: card.address?.city || "",
        street: card.address?.street || "",
        houseNumber: card.address?.houseNumber?.toString() || "",
        zip: card.address?.zip?.toString() || "",
    };
};

export default createInitialFormFromCard;