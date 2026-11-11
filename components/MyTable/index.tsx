'use client'
import React from 'react'

import MyButton from '../MyButton'
import { ArrowDownIcon } from '../Icons/ArrowDown'

import useLanguage from '@/hooks/useLanguage'
import { cn } from '@/utils/tailwind'

export interface Column {
  key: string
  label: string
  allowSorting?: boolean
  className?: string
  align?: 'left' | 'center' | 'right'
}

export type SortDescriptor = {
  column?: string
  direction?: 'ascending' | 'descending'
}

interface MyTableProps {
  columns: Column[]
  items: any[]
  renderCell: (item: any, columnKey: string) => React.ReactNode
  /** Optional card layout used on mobile instead of the table */
  renderMobileItem?: (item: any) => React.ReactNode
  isLoading?: boolean
  hasNextPage?: boolean
  onLoadMore?: () => void
  ariaLabel?: string
  emptyContent?: React.ReactNode
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor) => void
  classNames?: { wrapper?: string; table?: string }
}

const ALIGN_CLASS = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const rowKey = (item: any, index: number) => item?._id || item?.id || item?.key || `row-${index}`

const MyTable = ({
  columns,
  items,
  renderCell,
  renderMobileItem,
  isLoading,
  hasNextPage,
  onLoadMore,
  ariaLabel = 'Data table',
  emptyContent,
  sortDescriptor,
  onSortChange,
  classNames,
}: MyTableProps) => {
  const { translate } = useLanguage()
  const isEmpty = !isLoading && items.length === 0

  const handleSort = (column: Column) => {
    if (!column.allowSorting || !onSortChange) {
      return
    }
    const isSame = sortDescriptor?.column === column.key
    const direction = isSame && sortDescriptor?.direction === 'ascending' ? 'descending' : 'ascending'

    onSortChange({ column: column.key, direction })
  }

  const renderEmpty = () => <div className='py-10 text-center text-base-content/50'>{emptyContent || translate('common.noData')}</div>

  const renderLoading = () => (
    <div className='flex items-center justify-center gap-2 py-10 text-base-content/60'>
      <span className='loading loading-spinner loading-md' />
      <span>{translate('common.loading')}</span>
    </div>
  )

  return (
    <div className='flex w-full flex-col gap-4'>
      {/* Mobile: card list (only when a card renderer is supplied) */}
      {renderMobileItem && (
        <div className='flex flex-col gap-3 md:hidden'>
          {items.map((item, index) => (
            <div key={rowKey(item, index)} className='rounded-box border border-base-300 bg-base-100 p-4 shadow-sm'>
              {renderMobileItem(item)}
            </div>
          ))}
          {isEmpty && renderEmpty()}
          {isLoading && renderLoading()}
        </div>
      )}

      {/* Desktop table (always visible when no mobile renderer is supplied) */}
      <div
        className={cn(
          'w-full overflow-x-auto rounded-box border border-base-300 bg-base-100',
          renderMobileItem && 'hidden md:block',
          classNames?.wrapper
        )}
      >
        <table aria-label={ariaLabel} className={cn('table', classNames?.table)}>
          <thead>
            <tr className='bg-base-200'>
              {columns.map((column) => {
                const isSorted = sortDescriptor?.column === column.key

                return (
                  <th
                    key={column.key}
                    className={cn(
                      'text-xs font-bold uppercase tracking-wide text-base-content/70',
                      ALIGN_CLASS[column.align || 'left'],
                      column.allowSorting && 'cursor-pointer select-none hover:text-base-content',
                      column.className
                    )}
                    onClick={() => handleSort(column)}
                  >
                    <span className='inline-flex items-center gap-1'>
                      {column.label}
                      {column.allowSorting && (
                        <ArrowDownIcon
                          className={cn(
                            'h-3 w-3 transition-transform',
                            isSorted ? 'opacity-100' : 'opacity-30',
                            isSorted && sortDescriptor?.direction === 'ascending' && 'rotate-180'
                          )}
                        />
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={rowKey(item, index)} className='hover:bg-base-200/60'>
                {columns.map((column) => (
                  <td key={column.key} className={cn('align-middle', ALIGN_CLASS[column.align || 'left'], column.className)}>
                    {renderCell(item, column.key)}
                  </td>
                ))}
              </tr>
            ))}
            {(isEmpty || isLoading) && (
              <tr>
                <td colSpan={columns.length}>{isLoading ? renderLoading() : renderEmpty()}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {hasNextPage && (
        <div className='flex justify-center'>
          <MyButton isLoading={isLoading} variant='outline' onClick={onLoadMore}>
            {translate('common.loadMore')}
          </MyButton>
        </div>
      )}
    </div>
  )
}

export default MyTable
