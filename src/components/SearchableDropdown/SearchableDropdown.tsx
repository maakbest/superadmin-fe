import React, { useState, useEffect, useRef } from 'react'

interface OptionType {
	[key: string]: any
}

interface SearchableDropdownProps<T extends OptionType> {
	options: T[]
	selected: T | null
	onSelect: (value: T) => void
	labelKey: string // key to display
	placeholder?: string
	className?: string
	searchable?: boolean
}

const SearchableDropdown = <T extends OptionType>({ options, selected, onSelect, labelKey, placeholder = 'Select...', className = '', searchable = true }: SearchableDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState('')
	const dropdownRef = useRef<HTMLDivElement>(null)

	// ✅ Filtered options
	const filteredOptions = options.filter((opt) => opt[labelKey]?.toString().toLowerCase().includes(search.toLowerCase()))

	// ✅ Close when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<div ref={dropdownRef} className={`relative ${className}`}>
			{/* Selected Value */}
			<div className="border border-gray-300 rounded px-3 py-2 text-sm flex justify-between items-center cursor-pointer bg-white hover:border-gray-400 transition" onClick={() => setIsOpen(!isOpen)}>
				<span className="capitalize truncate">{selected ? selected[labelKey] : placeholder}</span>
				<span className="text-gray-500 text-xs ml-2">▼</span>
			</div>

			{/* Dropdown List */}
			{isOpen && (
				<div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-hidden">
					{/* Search input */}
					{searchable && (
						<div className="p-2 border-b border-gray-200">
							<input type="text" placeholder="Search..." className="w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" value={search} onChange={(e) => setSearch(e.target.value)} />
						</div>
					)}

					{/* Options */}
					<ul className="max-h-48 overflow-y-auto">
						{filteredOptions.length > 0 ? (
							filteredOptions.map((option, idx) => (
								<li
									key={idx}
									onClick={() => {
										onSelect(option)
										setIsOpen(false)
										setSearch('')
									}}
									className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 ${selected && selected[labelKey] === option[labelKey] ? 'bg-blue-100 font-medium' : ''}`}
								>
									{option[labelKey]}
								</li>
							))
						) : (
							<li className="px-3 py-2 text-sm text-gray-400">No results found</li>
						)}
					</ul>
				</div>
			)}
		</div>
	)
}

export default SearchableDropdown
