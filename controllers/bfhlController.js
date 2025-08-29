const processData = (req, res) => {
	try {
		const { data, email, roll_number, full_name, dob } = req.body;

		const requiredFields = [
			"data",
			"email",
			"roll_number",
			"full_name",
			"dob",
		];
		for (const field of requiredFields) {
			if (!req.body[field]) {
				return res.status(400).json({
					is_success: false,
					user_id: "N/A",
					error: `Missing required field: ${field}`,
				});
			}
		}

		if (!Array.isArray(data)) {
			return res.status(400).json({
				is_success: false,
				error: "Invalid input: 'data' must be an array.",
			});
		}
		if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
			return res
				.status(400)
				.json({ is_success: false, error: "Invalid email format." });
		}
		if (
			typeof roll_number !== "string" &&
			typeof roll_number !== "number"
		) {
			return res.status(400).json({
				is_success: false,
				error: "'roll_number' must be a string or number.",
			});
		}
		if (typeof full_name !== "string" || full_name.length === 0) {
			return res.status(400).json({
				is_success: false,
				error: "'full_name' must be a non-empty string.",
			});
		}
		if (typeof dob !== "string" || !/^\d{8}$/.test(dob)) {
			return res.status(400).json({
				is_success: false,
				error: "Invalid date of birth format. Please use DDMMYYYY.",
			});
		}

		const odd_numbers = [];
		const even_numbers = [];
		const alphabets = [];
		const special_characters = [];
		let sum = 0;
		let alphabeticalChars = "";

		data.forEach((item) => {
			const itemStr = String(item);

			if (
				!isNaN(itemStr) &&
				itemStr.trim() !== "" &&
				!isNaN(parseFloat(itemStr))
			) {
				const num = Number(itemStr);
				if (num % 2 === 0) {
					even_numbers.push(itemStr);
				} else {
					odd_numbers.push(itemStr);
				}
				sum += num;
			} else if (/^[a-zA-Z]+$/.test(itemStr)) {
				alphabets.push(itemStr.toUpperCase());
				alphabeticalChars += itemStr;
			} else {
				special_characters.push(itemStr);
			}
		});

		const reversedAlphabeticalChars = alphabeticalChars
			.split("")
			.reverse()
			.join("");

		let concat_string = "";
		for (let i = 0; i < reversedAlphabeticalChars.length; i++) {
			if (i % 2 === 0) {
				concat_string += reversedAlphabeticalChars[i].toUpperCase();
			} else {
				concat_string += reversedAlphabeticalChars[i].toLowerCase();
			}
		}

		const user_id = `${full_name.toLowerCase().replace(/ /g, "_")}_${dob}`;

		const response = {
			is_success: true,
			user_id,
			email,
			roll_number: String(roll_number),
			odd_numbers,
			even_numbers,
			alphabets,
			special_characters,
			sum: sum.toString(),
			concat_string,
		};

		res.status(200).json(response);
	} catch (error) {
		console.error("Error processing request:", error);
		res.status(500).json({
			is_success: false,
			user_id: "N/A",
			error: "Internal Server Error",
		});
	}
};

module.exports = {
	processData,
};
