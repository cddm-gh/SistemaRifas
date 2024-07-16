import { format, getHours } from 'date-fns';
import { es } from 'date-fns/locale';

/**
 * Formats a given date string to display in Spanish with capitalized month and correct time grammar.
 * @param {string} dateString - The date string to format (should be in ISO 8601 format).
 * @returns {string} The formatted date string, e.g., "15 de Agosto de 2024 a la 1:00 PM".
 */
export const formatDateTzToDisplay = (dateString: string) => {
	const hour = getHours(dateString);
	const formattedDate = format(
		dateString,
		`d 'de' MMMM yyyy '${hour === 1 || hour === 13 ? 'a la' : 'a las'}' h:mm a`,
		{
			locale: es
		}
	);

	// Capitalize the month name
	const capitalizedDate = formattedDate.replace(
		/\b(\w+ de )(\w+)( \d{4})/,
		(_, before, month, after) => before + month.charAt(0).toUpperCase() + month.slice(1) + after
	);

	return capitalizedDate;
};
