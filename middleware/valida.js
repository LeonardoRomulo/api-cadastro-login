const valida = (req, res, next) => {
    const { nome, email, cpf, senha } = req.body;
    if (!nome || typeof nome !== 'string' || !/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(nome)) {
        return res.status(400).json({ message: "Nome inválido" });
    };

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}(\.[^\s@]{2,})?$/.test(email.trim())) {
        return res.status(400).json({ message: "Email inválido" });
    };

    if (!cpf || typeof cpf !== "string" || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf.trim())) {
        return res.status(400).json({ message: "Cpf inválido" });
    }

    //A senha deve ter no mínimo 8 caracteres com pelo meno uma letra maiuscula, uma minuscula, um número e um caractere especial
    if (!senha || typeof senha !== 'string' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha.trim())){
        return res.status(400).json({message: "Senha inválida"})
    }
    next();
};

export default valida; 