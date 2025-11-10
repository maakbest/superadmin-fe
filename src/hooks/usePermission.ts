import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const usePermission = (key: string) => {
	const permissions = useSelector((state: any) => state.Auth.permissions)
	const validatePermission = useMemo(() => permissions?.includes(key), [permissions, key])
	return validatePermission
}
