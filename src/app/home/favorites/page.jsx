import UniversitiesList from '@/components/UniversitiesList'
import { universityList } from '@/data/universityList'

export default function FavoritesPage() {
    return (
        <div>
            <UniversitiesList data={universityList} />
        </div>
    )
}
