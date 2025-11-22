'use client'

import { Relationship } from '@/types'
import { Users, Edit2, Trash2 } from 'lucide-react'

interface RelationshipSelectorProps {
  relationships: Relationship[]
  currentRelationship: Relationship | null
  onSelect: (relationship: Relationship | null) => void
  onEdit?: (relationship: Relationship) => void
  onDelete?: (relationship: Relationship) => void
  onAdd?: () => void
}

export function RelationshipSelector({
  relationships,
  currentRelationship,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
}: RelationshipSelectorProps) {
  if (relationships.length === 0) {
    return (
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">Add Relationship Context</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Get better translations by adding context about your relationship and communication patterns.
        </p>
        {onAdd && (
          <button
            onClick={onAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Relationship Context
          </button>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Relationship Context</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + Add New
          </button>
        )}
      </div>

      <div className="space-y-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full text-left p-3 rounded-lg border transition-colors ${
            !currentRelationship
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-gray-700">No specific relationship</span>
        </button>

        {relationships.map((relationship) => (
          <div
            key={relationship.id}
            className={`p-3 rounded-lg border transition-colors ${
              currentRelationship?.id === relationship.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <button
                onClick={() => onSelect(relationship)}
                className="flex-1 text-left"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-medium text-gray-900">
                    {relationship.partner_name}
                  </span>
                </div>
                {relationship.relationship_context && (
                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {relationship.relationship_context}
                  </p>
                )}
              </button>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(relationship)}
                    className="p-1 text-gray-500 hover:text-blue-600"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(relationship)}
                    className="p-1 text-gray-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
